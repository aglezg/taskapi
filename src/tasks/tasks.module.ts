import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TasksSchema } from 'src/schemas/tasks.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Task.name,
      schema: TasksSchema
    }
  ])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
