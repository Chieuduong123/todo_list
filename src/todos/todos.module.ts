import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { LoggerMiddleware } from 'src/middlewares/logging.middleware';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { TodoInformation } from 'src/todo_informations/entities/todo_information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User, TodoInformation])],
  controllers: [TodosController],
  providers: [TodosService, UsersService],
})
export class TodosModule {}
