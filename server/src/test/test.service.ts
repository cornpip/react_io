import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
    count: number;
    constructor(){
        this.count = 0;
    }

    countup(){
        this.count++;
    }

    getcount(){
        console.log(this.count);
        return this.count;
    }

    hello(){
        console.log("hello");
        return 'hello'
    }
}
