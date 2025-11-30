import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber } from "class-validator"

export class CreateUserDto {
     @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
}
