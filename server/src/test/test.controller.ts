import { Controller ,Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService
    ){}

    @Get('/dd')
    test(){
        this.testService.countup();
        this.testService.getcount();
        return
    }
}
