import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USERSen } from '../Entities/users.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from '../services/cloudinary.service';
import { AuthService } from '../Auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([USERSen])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    CloudinaryConfig,
    CloudinaryService,
    AuthService,
  ],
}) 
export class UserModule {} 
