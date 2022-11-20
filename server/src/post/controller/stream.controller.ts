import { Body, Controller, Header, Post, StreamableFile } from '@nestjs/common';
import { createReadStream, read } from 'fs';
import { join } from 'path';
import { ReadFileDto } from '../dto';

@Controller('file')
export class StreamController {

    @Post('/md')
    getFile(
        @Body("mdName") mdName: string
    ): StreamableFile{
        // console.log(mdName);
        const mdfile_path = join("markdown", mdName)
        const mdfile = createReadStream(mdfile_path);
        return new StreamableFile(mdfile);
    }

    @Post('/image')
    // @Header("Content-Type", "image/png") 기본은 octet
    getImage(
        @Body("image") image: string
    ): StreamableFile{
        // console.log(image);
        const image_path = join("img", image);
        const imagefile = createReadStream(image_path);
        return new StreamableFile(imagefile);
    }
}
