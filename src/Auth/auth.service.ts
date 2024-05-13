import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from "../users/users.repository";
import { LoginUserDto } from "./LoginUserDto";
import { SignupDto } from "src/users/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {}

      async signUp(user: SignupDto)
    //   async signUp(user: Partial<USERSen>) 
    {
        const {email, password} = user;
        //verificcar si el email esta registrado
        const foundUser = await this.usersRepository.getUserByEmail(email);
        if(foundUser) throw new BadRequestException("El email ya registrado");

        /* Hashear el password */
        const hashedPassword = await bcrypt.hash(password, 10);

        // Grabar en BBDD
        return await this.usersRepository.createUser({...user, password: hashedPassword});
     } 

    
    // async singIn(email: string, password: string) {
        async singIn(credentials: LoginUserDto) {
            const { email, password } = credentials
         if(!email || !password) return "credenciales incorrectas";
        //Verifico que exista el usuario
        const user = await this.usersRepository.getUserByEmail(email);
        if(!user) throw new UnauthorizedException("incorrect credentials");

        //Comparamos contraseña
        const validPassword = await bcrypt.compare(password,user.password);
         if(!validPassword) throw new UnauthorizedException("incorrect credentials"); 

        // Firmar token
        const userPayload = {id: user.id,email: user.email,
             isAdmin: user.isAdmin}

        const token = this.jwtService.sign(userPayload);
        return {
            message: "Usuario logueado con token:", token,
        }
    }
}
