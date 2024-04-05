import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoInformationDto } from './create-todo_information.dto';

export class UpdateTodoInformationDto extends PartialType(CreateTodoInformationDto) {}
