import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Guard/auth.guard';
import { ROLES } from 'src/Decoradores/roles.decoradores';
import { Role } from './Roles/roles.enum';
import { RolesGuard } from 'src/Guard/roles.guard';
import { MinZizeValidatorPipe } from 'src/pipes/min-zize-validator.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';


@ApiBearerAuth()
@ApiTags('USERS')
@Controller("users")
export class UsersController {
  constructor(private readonly usersService01: UsersService,
   ) {}                                                    

  //Controller: Get all users
  @Get() 
  @ROLES(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  getUsers(@Query("page") page:string, @Query("limit") limit:string) {
    if(page && limit){
      return this.usersService01.getUsers(Number(page), Number(limit));
    }
    return this.usersService01.getUsers(1, 5)
  }

  //Controller: Get users by Id
  @ROLES(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @Get(":id")
  getUserById(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService01.getUserById(id);
  }

  //Controller: Update user by Id
  @ROLES(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @Put(":id")
  updateUser(@Param("id",ParseUUIDPipe) id: string, @Body() user: UserDto) {
     return this.usersService01.updateUser(id, user);
   }

  //Controller: Remove user by Id
  @ROLES(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @Delete(":id")
  deleteUser(@Param("id",ParseUUIDPipe) id: string) {
    // return `Solicitud de eliminacion de usuario ${resolve} exitosa`;
    return this.usersService01.deleteUser(id);
  }

  //Controller: To charger files (profile photo)
  @Post("profile/photo")
  @UseInterceptors(FileInterceptor("image"))
  @UsePipes(MinZizeValidatorPipe)
  getUserImages(
    @UploadedFile(
     new ParseFilePipe({
       validators:[
        new MaxFileSizeValidator({
         maxSize: 200000,
         message: "El archivo debe ser menor a 100kb",
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp|gif|svg)$/,
        })
      ],
     }),

  ) file: Express.Multer.File) {
    //  return this.usersService01.uploadImage(file);
    return file;
  }

}

