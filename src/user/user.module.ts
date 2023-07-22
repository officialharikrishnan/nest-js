import { Module } from '@nestjs/common';
import { UserSevice } from './user.service';
import { UserController } from './user.controller';

@Module({
    providers: [UserSevice],
    controllers: [UserController],
})
export class UserModule {}
