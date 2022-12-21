import { DefaultValuePipe } from "@nestjs/common"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    active: boolean
}