import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoInformationsService } from './todo_informations.service';
import { CreateTodoInformationDto } from './dto/create-todo_information.dto';
import { UpdateTodoInformationDto } from './dto/update-todo_information.dto';

@Controller('todo-informations')
export class TodoInformationsController {
  constructor(private readonly todoInformationsService: TodoInformationsService) {}

  @Post()
  create(@Body() createTodoInformationDto: CreateTodoInformationDto) {
    return this.todoInformationsService.create(createTodoInformationDto);
  }

  @Get()
  findAll() {
    return this.todoInformationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoInformationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoInformationDto: UpdateTodoInformationDto) {
    return this.todoInformationsService.update(+id, updateTodoInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoInformationsService.remove(+id);
  }
}
