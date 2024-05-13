import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.services';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductDTO, ProductDTODOS } from './product.dto';
import { ROLES } from 'src/Decoradores/roles.decoradores';
import { Role } from 'src/users/Roles/roles.enum';
import { RolesGuard } from 'src/Guard/roles.guard';


@ApiTags('products')
@Controller("products")
export class ProductsController {
  constructor(private readonly productsControllers01: ProductsService,
  ) {}

  //Controllers: Get All products page and limit
  @Get()
  getProducts(
    @Query('page') page:string, @Query('limit') limit:string
  ){
    return this.productsControllers01.GetProductsServices(Number(page),Number(limit));
  }

  //Controllers: Get by Id products
  @Get(":id")
  GetProductsController( @Param("id") id: string ) {
    return this.productsControllers01.GetProductsServicesId(id);
  }

  //Controllers: Add products in the database
  @ROLES(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Post()
  PostProductsControllerAdd(@Body() product: ProductDTO) {
    return this.productsControllers01.AddProductsServices(product);    
  }
 
  // Constrollers: Update products
  @ROLES(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Put(":id")
  PutProductsController(@Param("id") id: string, @Body() product: ProductDTODOS) {
    return this.productsControllers01.updateProductsServices(id, product);
  }

  // Controllers: Delete products
  @ROLES(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Delete(":id")
  DeleteProductsController(@Param("id") id: string) {
    return this.productsControllers01.DeleteProductsServices(id);
  }

  //Controllers: Add products or charge the base
  @Post("seeder")
  PostProductController(){
    return this.productsControllers01.PostProductsServices();
  }

  //Service: Update imgUrl with cloudinary at servidor
  @ROLES(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Post("uploadImage/:id")
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
      @Param("id") productId: string,
      @UploadedFile(
          new ParseFilePipe({
              validators: [
                  new MaxFileSizeValidator({ maxSize: 200000, message: 'El archivo debe ser menor a 200kb' }),
                  new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|webp)$/ }),
              ]
          })
      ) file: Express.Multer.File,) {
          // console.log(file);
          return this.productsControllers01.uploadImage(file, productId);
      }

}
