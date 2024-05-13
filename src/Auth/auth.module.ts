import { Module } from '@nestjs/common';
import { AuthsController } from './auth.controller';
import { UsersRepository } from '../users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USERSen } from 'src/Entities/users.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '../Guard/auth.guard';


@Module({
  imports: [TypeOrmModule.forFeature([USERSen])],
  controllers: [AuthsController],
  providers: [AuthService,UsersRepository,AuthGuard],
})
export class AuthtModule {}
