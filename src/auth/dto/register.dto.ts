import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
