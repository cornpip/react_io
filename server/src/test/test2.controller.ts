import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test2')
export class Test2Controller {
    constructor(
        private readonly testService2: TestService
    ){}

    @Get('/dd')
    test(){
        this.testService2.countup();
        this.testService2.getcount();
        return
    }

    @Get('/what')
    aa(){
        return `what`
    }
}
