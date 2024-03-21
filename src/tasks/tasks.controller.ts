import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Task } from 'src/schemas/tasks.schema';

@Controller('tasks')
export class TasksController {

  constructor(private taskService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll()
  }

  @Get('/id/:id')
  findById(@Param('id') id: string): Promise<Task> {
    return this.taskService.findById(id)
  }

  @Get('/title/:title')
  findByTitle(@Param('title') title: string): Promise<Task[]> {
    return this.taskService.findByTitle(title)
  }

  @Post()
  create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.taskService.create(body);
  }

  @Delete('/id/:id')
  deleteById(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteById(id)
  }

  @Delete('/title/:title')
  deleteOneByTitle(@Param('title') title: string): Promise<Task> {
    return this.taskService.deleteOneByTitle(title)
  }

  @Put('/id/:id')
  updateById(@Param('id') id: string, @Body() body: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateById(id, body)
  }

  @Put('/title/:title')
  updateOneByTitle(@Param('title') title: string, @Body() body: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateOneByTitle(title, body)
  }
}
