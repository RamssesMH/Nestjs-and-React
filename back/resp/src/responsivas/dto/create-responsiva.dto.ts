import { IsDateString, IsInt, IsNumber, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateResponsivaDto {

    @IsString()
    matricula: string;
    @IsString()
    @MinLength(10)
    nombre: string;
    @IsString()
    @MinLength(12)
    @MaxLength(13)
    rfc: string;
    @IsString()
    rol: string;
    @IsString()
    usuario: string;
    @IsString()
    tipoResponsiva: string;
    @IsString()  //// yyyy-mm-dd
    fecha: string;
    @IsString()
    codigo: string;


}
