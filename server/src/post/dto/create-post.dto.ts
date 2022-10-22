import { IsString } from "class-validator";


export class CreatePostDto {
    @IsString()
    readonly feature_title: string;
    
}
