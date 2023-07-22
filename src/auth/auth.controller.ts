import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){

    }
    @Post('signup')
    register(@Body() body:AuthDto){
        return this.authService.signup(body);
    }
    @Post('/login')
    login(@Body() body:AuthDto){
        return this.authService.login(body);
    }

    
}