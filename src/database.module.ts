import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Todo } from './todos/entities/todo.entity';
import { TodoInformation } from './todo_informations/entities/todo_information.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASS'),
        database: configService.getOrThrow('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [User, Todo, TodoInformation],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

