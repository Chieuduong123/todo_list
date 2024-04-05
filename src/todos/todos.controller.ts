import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateTodoInformationDto } from 'src/todo_informations/dto/create-todo_information.dto';
import { Todo } from './entities/todo.entity';
import { UpdateTodoInformationDto } from 'src/todo_informations/dto/update-todo_information.dto';

@UseInterceptors(LoggingInterceptor)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @CurrentUser() currentUser: User,
    @Body() createTodoInformationDto: CreateTodoInformationDto,
  ) {
    return await this.todosService.create(
      createTodoDto,
      currentUser,
      createTodoInformationDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getListTodo(@CurrentUser() currentUser: User): Promise<any> {
    return this.todosService.getAllTodo(currentUser.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ): Promise<Todo> {
    return await this.todosService.getTodoById(id, currentUser.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Body() UpdateTodoInformationDto: UpdateTodoInformationDto,
    @CurrentUser() currentUser: User,
  ): Promise<Todo> {
    if (!currentUser || !currentUser.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.todosService.updateTodo(
      id,
      currentUser.id,
      updateTodoDto,
      UpdateTodoInformationDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeTodo(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ): Promise<any> {
    if (!currentUser || !currentUser.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    const message = await this.todosService.removeTodo(id, currentUser.id);

    return { message };
  }
}
