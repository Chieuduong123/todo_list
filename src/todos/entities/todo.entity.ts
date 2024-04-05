import { TodoInformation } from 'src/todo_informations/entities/todo_information.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  due_date: Date;

  @Column()
  completed: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.todo)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => TodoInformation, (todoInformation) => todoInformation.todo)
  todoInformation: TodoInformation[];
}
