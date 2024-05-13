import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
//Class validator: Esta parte del codigo define una clase DTO(Data Transfer Objetc)
//Se utiliza para validar los datos de entrada en una aplicacion NodeJS. utilizando decoradores proporcionado,
//por la biblioteca "class-validator". Los decoradores como @IsNotEmpty, @IsString y etc, se utilizan para definir
//reglas de validacion para cada propiedad de la clase. Esta clase se utilizan frameworks como NestJS.
// Esta parte se centra en la validacion de datos de entrada en una aplicacion.
// Por ejemplo, antes de enviar datos a la base de datos o procesarlos en una API, se usa "class-validator"
// para asegurarte de que los datos cumplen con ciertos criterios(longitud,formato de correo electronico, etc).

export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @ApiProperty({ description: 'Correo electrónico', example: 'darvinAlania@gmail.com' })   
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    @ApiProperty({ description: 'Contraseña', example: 'abcpd1234AB!*/' })   
    password: string;
}

