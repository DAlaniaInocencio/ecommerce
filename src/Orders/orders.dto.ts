import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { PRODUCTSen } from "src/Entities/products.entity";



export class OrderDto {
@ApiProperty({ description: 'userId', example: 'be671df7-f471-4c3b-af78-9f8946a38273' })   
@IsNotEmpty()
@IsUUID()
userId: string   

@ApiProperty({ description: 'Products', example: '[{"id": "9b5ac607-97bb-410d-b373-bd7f59e3ece6"}]' })   
@IsArray()
@ArrayMinSize(1)
products: Partial<PRODUCTSen[]>

}