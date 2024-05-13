import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeormConfig from './config/typeorm';
import { CategoryModule } from './Categories/category.module';
import { OrderModule } from './Orders/orders.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthtModule } from './Auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { QueryFailedExceptionFilter } from './Middlewares/validationUUID';
import { OrderDetailsModule } from './OrderDetails/orderDetails.module';



@Module({
  imports: [
    //Configuramos a las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load:[typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      //Accedemos a las variables de entorno 
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get("typeorm")

    }),
        
    UserModule,ProductModule,
    AuthtModule,
    CategoryModule,OrderModule,
    OrderDetailsModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '360m' },
    })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
],
})
export class AppModule {}
