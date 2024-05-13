import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MinZizeValidatorPipe implements PipeTransform {
 transform(value: any, metadata: ArgumentMetadata) {
     const minSize = 10000; // Eñ ta,año minimo para subir dle archivo
     if(value.size < minSize){
         throw new BadRequestException(`El tamaño del archivo debe ser muy pequena en bytes`);
        }
        return value;   
    }
}