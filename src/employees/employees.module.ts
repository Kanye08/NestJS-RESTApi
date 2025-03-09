import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
