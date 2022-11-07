import { IsEmpty, IsOptional, IsString } from "class-validator";

export class ReadFileDto {
    
    @IsString()
    readonly mdName: string

    @IsOptional()
    @IsString()
    readonly image: string
}
