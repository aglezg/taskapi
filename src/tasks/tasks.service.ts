import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/tasks.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  findAll(): Promise<Task[]> {
    return this.taskModel.find()
  }

  async findById(id: string): Promise<Task> {
    return this.taskModel.findById(id)
  }

  async findByTitle(title: string): Promise<Task[]> {
    return this.taskModel.find({title})
  }

  async create(task: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(task)
    await createdTask.save()
    return createdTask
  }

  async deleteById(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id)
  }

  async deleteOneByTitle(title: string): Promise<Task> {
    return this.taskModel.findOneAndDelete({title})
  }

  async updateById(id: string, task: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, task, {new: true})
  }

  async updateOneByTitle(title: string, task: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findOneAndUpdate({title}, task, {new: true})
  }
}
