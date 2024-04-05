import { Todo } from 'src/todos/entities/todo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todo_information')
export class TodoInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  todoId: number;

  @ManyToOne(() => Todo, (todo) => todo.todoInformation)
  @JoinColumn({ name: 'todoId' })
  todo: Todo;
}
