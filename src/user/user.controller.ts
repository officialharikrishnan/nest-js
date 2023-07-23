import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserDto } from "./dto";
import { UserSevice } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/get-user-decorator";
import { User } from "@prisma/client";

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController{
    constructor(private userService:UserSevice){}

    @Post('blog')
    async create(@Body() body:UserDto){
        console.log(body)
       return await this.userService.create(body);
    }
    @Get('blog')
    async findAll(@GetUser() user:User){
        console.log('called')
        return await this.userService.findAll();
    }
    @Get('blog/:id')
    async findOne(@Param('id') id:number){
        console.log('called')
        return await this.userService.findOne(id);
    }

    
} 