## Singleton
+ singleton을 말하는 instance는 service이다. service는 providers에서 주입되고 하나의 instance로 유지된다.  

+ 여기서 __providers는 module 단위로 관리를 해야 기대하는 singleton대로 동작한다.__  
예를 보자. PostModule에 StateService의 의존성 주입이 있다. 여기서 AppModule에서 PostModule을 import하고 __AppModule에도__ StateService를 주입한다면 StateService는 하나의 instance로 동작하지 않는다.  

---
## Life cycle 
+ Middleware / Guard / Interceptor / Pipe / Handler ... 해당하는 cycle에서 다루기 알맞는 문제일지 생각하고 적용하자. 