import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Injectable() //일단 injectable없어도 pipe로 기능함
export class IsFile implements PipeTransform {
    private readonly logger = new Logger(IsFile.name);

    transform(value: any, metadata: ArgumentMetadata) {
        // this.logger.debug(value["md"]);
        if(!value["md"]){
            this.logger.log("### Pipe : Bad request")
            throw new HttpException('Not found md File', HttpStatus.BAD_REQUEST);
        }
        this.logger.log('### Pipe : Pass');
        return value;
    }
}