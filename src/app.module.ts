import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjsrestapi',
      entities: [User],
      synchronize: true,
    }),
    EmployeesModule,
    ThrottlerModule.forRoot([{
      name:'short',
      ttl: 1000,
      limit: 3 //maximum requests per minute
    },
    {
      name:'long',
      ttl: 60000,
      limit: 100 
      // this means request can't exceed 3 per second and 100 per minute
    }])
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
