import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TodoInformation } from 'src/todo_informations/entities/todo_information.entity';
import { CreateTodoInformationDto } from 'src/todo_informations/dto/create-todo_information.dto';
import { UpdateTodoInformationDto } from 'src/todo_informations/dto/update-todo_information.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(TodoInformation)
    private readonly todoInformationRepository: Repository<TodoInformation>,
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
    currentUser: User,
    createTodoInformationDto: CreateTodoInformationDto,
  ): Promise<{ todo: Todo; todoInformation: TodoInformation }> {
    const todo = this.todoRepository.create(createTodoDto);
    todo.user = currentUser;

    const savedTodo = await this.todoRepository.save(todo);

    const todoInformation = this.todoInformationRepository.create({
      todo: savedTodo,
      description: createTodoInformationDto.description,
    });

    const savedTodoInformation =
      await this.todoInformationRepository.save(todoInformation);

    return { todo: savedTodo, todoInformation: savedTodoInformation };
  }

  async getTodoById(id: number, userId: number): Promise<any> {
    const todo = await this.todoRepository.findOne({
      where: { id: id, userId: userId },
      relations: ['todoInformation'],
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async getAllTodo(userId: number): Promise<any> {
    return this.todoRepository.find({
      where: { userId: userId },
      relations: ['todoInformation'],
    });
  }

  async updateTodo(
    id: number,
    userId: number,
    updateTodoDto: UpdateTodoDto,
    UpdateTodoInformationDto: UpdateTodoInformationDto,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id: id, userId: userId },
      relations: ['todoInformation'],
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    todo.title = updateTodoDto.title;
    todo.due_date = updateTodoDto.due_date;
    todo.completed = updateTodoDto.completed;

    if (todo.todoInformation) {
      todo.todoInformation.forEach((todoInfo) => {
        todoInfo.description = UpdateTodoInformationDto.description;
      });
      await this.todoInformationRepository.save(todo.todoInformation);
    }

    return this.todoRepository.save(todo);
  }

  async removeTodo(id: number, userId: number): Promise<any> {
    const todo = await this.todoRepository.findOne({
      where: { id: id, userId: userId },
      relations: ['todoInformation'],
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    if (todo.todoInformation) {
      await this.todoInformationRepository.remove(todo.todoInformation);
    }

    await this.todoRepository.remove(todo);
    return 'Todo deleted successfully';
  }
}
