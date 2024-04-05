import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  due_date: Date;

  @IsNotEmpty()
  completed: boolean;
}
