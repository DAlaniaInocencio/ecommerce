import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as data from "../utils/data.json"
import { PRODUCTSen } from "../Entities/products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CATEGORYSen } from "src/Entities/category.entity";
import { ProductDTO } from "./product.dto";

///cloudinary
import { UploadApiResponse, v2 } from "cloudinary";
// import * as toStream from "buffer-to-stream";
import  toStream = require("buffer-to-stream");
////

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(PRODUCTSen)
        private readonly productsRepositorynew: Repository<PRODUCTSen>,

        @InjectRepository(CATEGORYSen)
        private readonly categoriesRepositorynew: Repository<CATEGORYSen>
    ) {}

    //Repository: Get all products
    async getProductsRepository(page: number, limit: number): Promise<ProductDTO[]> {
        let products = await this.productsRepositorynew.find(
            {
                relations: { category: true },
            });
        const start = (page - 1) * limit;
        const end = page * limit;
        products = products.slice(start, end);
        return products;
    }

    //Repository: Get by Id products
    async getProductsRepositoryId(id: string){
        const product00 = await this.productsRepositorynew.findOneBy({id});
        if(!product00) {return `Product with id ${id} not found`};

        return product00;
    }

    //Repository: Add products or charge the base
    async PostProductsRepository(){
        const categories00 = await this.categoriesRepositorynew.find();
        data?.map(async(Element) => {
            const category = categories00.find(
                (categor) => categor.name === Element.category,
            );

        //Creamos nuevo Produt y seteamos atributos:
        const newProduct = new PRODUCTSen();
        newProduct.name = Element.name;
        newProduct.description = Element.description;
        newProduct.price = Element.price;
        newProduct.stock = Element.stock;
        newProduct.imgUrl = Element.imgUrl
        newProduct.category = category;

        //engrave our new product on the DB:
        await this.productsRepositorynew
            .createQueryBuilder()
            .insert()
            .into(PRODUCTSen)
            .values(newProduct)
            //If product exists, update it
            .orUpdate(
                ["description", "price", "stock", "imgUrl"],["name"],
            )
            .execute();
        });
        return "Products aggregated"
    }

    async AddProductsRepository(product: ProductDTO){
        const newProduct = await this.productsRepositorynew.save(product);
        return newProduct;
    }

    //Repository: Update products
    async UpdateProductsRepository(id: string, product: Partial<PRODUCTSen>){
        const updateProduct = await this.productsRepositorynew.findOneBy({id});
        // if(!updateProduct) throw new NotAcceptableException( `Not found product with id ${id}`);

        if(!updateProduct)throw new NotFoundException( `Not found product with id ${id}`) 

        try {await this.productsRepositorynew.update(id,product);
        } catch (error) {throw new NotFoundException('No can´t update product because it´s UUID is invalid');}

        // await this.productsRepositorynew.update(id,product);       
         return updateProduct
   
    }

    //Repository: Delete products
    async DeleteProductsRepository(id: string){
        const productFind = await this.productsRepositorynew.findOne({where : {id}});
        if(!productFind)throw new NotFoundException( `Not found product with id ${id}`) 
        
            try {await this.productsRepositorynew.delete(productFind);
        } catch (error) {throw new ConflictException('No can´t delete product because UUID isn´t invalid');}
    
        // await this.productsRepositorynew.delete(productFind);
        return productFind
    }

    //**Para buscar en la base por name 
    async getProductsByName(name: string): Promise<PRODUCTSen> {
        return await this.productsRepositorynew.findOneBy({name: name});
    }

    //Repository: Update imgUrl with cloudinary
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                {resource_type: "auto"},
                (error, result) => {
                    if(error) {
                        return reject(error);
                    } else{
                        resolve(result);
                    }
                }
            );
            toStream(file.buffer).pipe(upload);
        })
    }


}