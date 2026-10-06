import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreatePlayerDto {
    
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @MinLength(4,{message:'El nombre debe tener mínimo 4 carácteres'})
    name:string;

    @IsNumber()
    @IsNotEmpty({message: 'Debe agregar health points'})
    healthPoints:number;
}
