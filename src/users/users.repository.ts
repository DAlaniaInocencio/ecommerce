import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { USERSen } from "../Entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(USERSen)
        private readonly usersRepository: Repository<USERSen>,
     
    ) {}

    // Repository:  Get all users
    async getUsersRepository(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const users = await this.usersRepository.find(
            {
                take: limit,
                skip: skip,
            });
        return users.map(({password, ...userNoPassword}) => userNoPassword);
    }

    //Repository: Get user by ID
    async getUserByIdRepository(id: string) {
        const indice = await this.usersRepository.findOne(
            {
                where: {id},
                relations: {
                    orders: true,
                },
        });

        if(!indice) throw new NotAcceptableException( `No se encontro usuario con id ${id}`);
        
        const {password,... userNoPassword} = indice
        return userNoPassword;
    }

    //Repository: Add new user, moved from place in Auth
      async createUser(user: Partial<USERSen>)
    {
        const newUser = await this.usersRepository.save(user);
        const dbUser = await this.usersRepository.findOneBy({id: newUser.id});
         const {password,... userNoPassword} = dbUser;
        return userNoPassword;
    }

    //Repository: Update users for Id
    async updateUser(id: string, user: Partial<USERSen>) {
        // await this.usersRepository.update(id,user);
        const updateIser = await this.usersRepository.findOneBy({id});
        if(!updateIser) throw new NotAcceptableException( `Not found user with id ${id}`);
        await this.usersRepository.update(id,user);
        const {password,... userNoPassword} = updateIser;
        return userNoPassword;
    }

    // Eliminar usuario por su ID
    async deleteUser(id: string) {
        const user = await this.usersRepository.findOneBy({id});
    
        if(!user)throw new NotFoundException( `Not found user with id ${id}`) 
        try {await this.usersRepository.remove(user);
        } catch (error) {throw new ConflictException('Can not delete user because it has relations with orders table');}

        const {password,... userNoPassword} = user;
        return userNoPassword;  
    }

    async getUserByEmail(email: string): Promise<USERSen>  {
        return await this.usersRepository.findOneBy({email: email});
    }
    // getUseraByEmailByAuth(email: string) {
    //     return this.userServices00.findOne({where: {email}})
    // }
    



}