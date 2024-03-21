import { Body, ConflictException, Controller, Delete, Get, NotAcceptableException, NotFoundException, Param, Post, Put } from '@nestjs/common';
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
  async findById(@Param('id') id: string): Promise<Task> {
    const response = await this.taskService.findById(id)
    if (!response) throw new NotFoundException(`task with id ${id} not found`)
    return response
  }

  @Get('/title/:title')
  async findByTitle(@Param('title') title: string): Promise<Task> {
    const response = await this.taskService.findByTitle(title)
    if (!response) throw new NotFoundException(`task with title ${title} not found`)
    return response
  }

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<Task> {
    try {
      await this.findByTitle(body.title)
    } catch(err) {
      return this.taskService.create(body);
    }
    throw new ConflictException(`a task with title ${body.title} already exist`)
  }

  @Delete('/id/:id')
  async deleteById(@Param('id') id: string): Promise<Task> {
    await this.findById(id)
    return this.taskService.deleteById(id)
  }

  @Delete('/title/:title')
  async deleteOneByTitle(@Param('title') title: string): Promise<Task> {
    await this.findByTitle(title)
    return this.taskService.deleteOneByTitle(title)
  }

  @Put('/id/:id')
  async updateById(@Param('id') id: string, @Body() body: UpdateTaskDto): Promise<Task> {
    await this.findById(id)
    return this.taskService.updateById(id, body)
  }

  @Put('/title/:title')
  async updateOneByTitle(@Param('title') title: string, @Body() body: UpdateTaskDto): Promise<Task> {
    await this.findByTitle(title)
    return this.taskService.updateOneByTitle(title, body)
  }
}
