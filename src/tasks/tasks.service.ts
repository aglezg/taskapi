import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/tasks.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  findAll() {
    this.taskModel.find()
  }

  async create(task: any) {
    const createdTask = new this.taskModel(task)
    await createdTask.save()
    return createdTask
  }

  async findOne(id: string) {
    return this.taskModel.findById(id)
  }

  async delete(id: string) {
    return this.taskModel.findByIdAndDelete(id)
  }

  async update(id: string, task: any) {
    return this.taskModel.findByIdAndUpdate(id, task)
  }
}
