import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { PRODUCTSen } from 'src/Entities/products.entity';
import { ProductDTO } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsServices00: ProductsRepository,
    @InjectRepository(PRODUCTSen)
    private readonly productsRepositorynew: Repository<PRODUCTSen>,
  ) {}

  //Service: Get All products page and limit
  GetProductsServices (page: number, limit: number){
    return this.productsServices00.getProductsRepository(page,limit);
  }

  //Service: Get by Id products
  GetProductsServicesId (id: string){
    return this.productsServices00.getProductsRepositoryId(id);
  }

  //Service: Add products or charge the base
  PostProductsServices (){
    return this.productsServices00.PostProductsRepository();
  }

  //Service: Add products
  async AddProductsServices (product: ProductDTO){
    const { name } = product;
    const existProduct = await this.productsServices00.getProductsByName(name);
    if(existProduct) throw new Error("Product already exists");
    
    return await this.productsServices00.AddProductsRepository({...product});    
  }

  // Service: Update products
  updateProductsServices (id: string, product: Partial<PRODUCTSen>){
    return this.productsServices00.UpdateProductsRepository(id, product);
  }

  //Service: Delete products
  async DeleteProductsServices(id: string){
    const productFind = await this.productsServices00.getProductsRepositoryId(id);
    await this.productsServices00.DeleteProductsRepository(id);
    return `Product with id ${id} deleted`;
  }

  //Service: Update imgUrl with cloudinary
  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepositorynew.findOneBy({id:productId});
   
    if(!product) {throw new NotFoundException("Product not found")};

    const uploadImage = await this.productsServices00.uploadImage(file);

    await this.productsRepositorynew.update(
      product.id,{
        imgUrl: uploadImage.secure_url,}
    )
   
    const updatedProduct = await this.productsRepositorynew.findOneBy({
      id:productId,
    }); 
   
    return updatedProduct;
  }
}
