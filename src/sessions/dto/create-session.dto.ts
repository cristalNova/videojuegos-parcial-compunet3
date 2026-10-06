import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSessionDto {
   @IsString({message:'El status debe ser string'})
   status: string;

   @IsNumber()
   @IsNotEmpty({message:'Se requiere de un player1'})
   player1:number;

   @IsNumber()
   @IsNotEmpty({message:'Se requiere de un player2'})
   player2:number;

   @IsNumber()
   max_rounds:number;
}
