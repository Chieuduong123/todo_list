import { IsNotEmpty } from 'class-validator';

export class CreateTodoInformationDto {
  @IsNotEmpty()
  todoId: number;

  @IsNotEmpty()
  description: string;
}
