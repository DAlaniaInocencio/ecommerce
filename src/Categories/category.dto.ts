import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";




export class categoryDto {
    
// @IsNotEmpty()
@IsOptional()
@IsUUID()
Id: string   

@IsNotEmpty()
@IsString()
name: string
}
//CategoryDto_ProductDto
export class categoryDto_product extends PickType (categoryDto,
    [
        'name'   
    ]
) {}