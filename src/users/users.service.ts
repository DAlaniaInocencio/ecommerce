import { Injectable } from '@nestjs/common';
import {  UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userServices00: UsersRepository) {}

  //Service: Get All users page and limit
  async getUsers(page: number, limit: number) {
    return await this.userServices00.getUsersRepository(page,limit)
  }

  //Service: Get users by Id
  getUserById(id: string) {
    return this.userServices00.getUserByIdRepository(id)
  }

  //Service: Update users for Id
  updateUser(id: string, user: any) {
    return this.userServices00.updateUser(id, user)
  }

  //Service: Delete users for Id
  deleteUser(id: string) {
    return this.userServices00.deleteUser(id)
  }

}
