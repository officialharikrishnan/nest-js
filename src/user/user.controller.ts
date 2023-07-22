import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserDto } from "./dto";
import { UserSevice } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private userService:UserSevice){}

    @Post('blog')
    async create(@Body() body:UserDto){
        console.log(body)
       return await this.userService.create(body);
    }
    @Get('blog')
    async findAll(){
        console.log('called')
        return await this.userService.findAll();
    }
    @Get('blog/:id')
    async findOne(@Param('id') id:number){
        console.log('called')
        return await this.userService.findOne(id);
    }

    
} 