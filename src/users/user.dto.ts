import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/Decoradores/matchPassword.decorator";

export class UserDto {
    
    @ApiHideProperty()
    id: string;

    @ApiProperty({ description: 'Name', example: 'Ariel'})   
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({ description: 'Email', example: 'darv.alania@gmail.com' })   
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    @ApiProperty({ description: 'Password', example: 'abcpd1234B!' })   
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({ description: 'Confirm Password', example: 'Repeat password' })   
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;
    
    @ApiProperty({ description: 'Address', example: 'Av.Separadora 101' })   
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({ description: 'Phone', example: '989648' })   
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /** Country: @example PerúPE */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    /** City: @example LimaEste */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(10)
    city00: string;
}

//* 1. Creat new DTO
//* 2. Use @nestjs/swagger (install)
export class SignupDto extends PickType (UserDto,
    [
        'name',
        'email',
        'password',
        'confirmPassword',
        'address',
        'phone',
        'country',
        'city00',    
    ]
) {
    // @ApiProperty({ description: 'DNI', example: '12345678' })
    // @IsNumber()
    // @MaxLength(8,{message: 'El DNI debe tener 8 digitos'})
    // dni: number;
}
 