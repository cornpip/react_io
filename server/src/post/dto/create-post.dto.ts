import { IsString } from "class-validator";


export class CreatePostDto {
    @IsString()
    readonly main_title: string;

    @IsString()
    readonly contents: string;
}
