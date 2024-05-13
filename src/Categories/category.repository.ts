import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CATEGORYSen } from "../Entities/category.entity";
import { Repository } from "typeorm";
import * as data from "../utils/data.json";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(CATEGORYSen)
        private categoriesRepositorynew: Repository<CATEGORYSen>,
    ) {}

    //Repository: Charge categories
    async PostCategoriesRepository(){
        console.log("Insertando categorías en la base de datos...");
        data?.map(async(element)=>{
            await this.categoriesRepositorynew
               .createQueryBuilder() //para crear una nueva instancia de una consulta SQL
               .insert() //para indicar que se realizará una operación de inserción en la base de datos.
               .into(CATEGORYSen) //especifica la tabla en la que se insertaran los datos. En este caso se llama CATEGORYSen 
               .values({name: element.category}) // especifica los valores que se insertaran en la tabla. En este caso, se passa un objeto de propiedad name, y su valor de propiedad de la variable "element.category"
               .orIgnore() //para ignorar el error de llave duplicada
               .execute();  // debe ser llamado al final de la cadena de métodos para ejecutar la consulta de inserción.
        });
        console.log("Categorías insertadas correctamente.");
        return "Categories created"
    } //Este codigo está construyendo y ejecutando una consulta SQL de inserción en la tabla "CATEGORYSen" con un nombre de cateogoria especifico,
      // y especificando que cualquier conflicto debería ser ignorado.
    

    //Repository: Get all categories
    async getCategoriesRepository(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const categories = await this.categoriesRepositorynew.find({
            take: limit,
            skip: skip,
            // relations: {
            //     product: true
            // },
        })
        return categories.map( ({ ... categoryAccumulator }) => categoryAccumulator );
    }

}   