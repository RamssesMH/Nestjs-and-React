import { IsAlpha, IsAscii, IsNumber, IsOptional, IsPositive, Min } from "class-validator";



export class PaginationDto {

    @IsPositive()
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number;

    @IsOptional()
    @IsAscii()
    search?: string;
}