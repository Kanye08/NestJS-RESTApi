import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { User, UserRole } from 'src/typeorm/entities/User';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle() // this fuction is to skip the throttle or rate limiter set in the app.module.ts. This is specific to only this controller
// @SkipThrottle at the top like this means it's applicable to all routes here
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() user: User) {
    return await this.employeesService.create(user);
  }

  @SkipThrottle({default: false})
  // @SkipThrottle here like this means it's not applicable to only this particular route
  @Get()
  async findAll(@Query('role') role?: UserRole) {
    return await this.employeesService.findAll(role);
  }

  @Throttle({short: {ttl: 1000, limit: 1}}) //this will override the one in app.module.ts
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: Partial<User>) {
    return await this.employeesService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.remove(+id);
  }
}
