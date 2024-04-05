import { Injectable } from '@nestjs/common';
import { CreateTodoInformationDto } from './dto/create-todo_information.dto';
import { UpdateTodoInformationDto } from './dto/update-todo_information.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TodoInformation } from './entities/todo_information.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TodoInformationsService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}
  create(createTodoInformationDto: CreateTodoInformationDto) {
    return 'This action adds a new todoInformation';
  }

  findAll() {
    return `This action returns all todoInformations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoInformation`;
  }

  update(id: number, updateTodoInformationDto: UpdateTodoInformationDto) {
    return `This action updates a #${id} todoInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoInformation`;
  }

}
