import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto/auth.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService){}
    async signup(dto:AuthDto){
        try{

            const hash =await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data:{
                    email:dto.email,
                    password:hash
                }
            })
            delete user.password;
            
            return user;
        }catch(e){
            if(e instanceof PrismaClientKnownRequestError){
                if(e.code === 'P2002'){
                    return new ForbiddenException('Email already exists');
                }
            }else{
                return new ForbiddenException('Something went wrong');
            }
        }
    }
    async login(dto:AuthDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        })
        if(!user){
            return new ForbiddenException('Invalid credentials');
        }
        const isPasswordValid = await argon.verify(user.password, dto.password);
        if(!isPasswordValid){
            return new ForbiddenException('Invalid credentials');
        }
        delete user.password;
        return user;
    }
        
    
}