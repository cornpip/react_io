import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Test2Controller } from './test2.controller';
@Module({
    providers:[
        TestService,
    ],
    controllers: [
        TestController,
        Test2Controller
    ],
    exports:[
        TestService
    ]
})
export class TestModule {}
