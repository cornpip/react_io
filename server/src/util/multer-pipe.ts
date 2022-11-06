import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class IsFile implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // console.log(value["md"]);
        if(!value["md"]){
            console.log("### Pipe : Bad request")
            throw new HttpException('Not found md File', HttpStatus.BAD_REQUEST);
        }
        console.log('### Pipe : Pass');
        return value;
    }
}