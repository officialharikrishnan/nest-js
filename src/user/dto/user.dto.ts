import { IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    userId: number;
}