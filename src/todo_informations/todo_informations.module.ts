import { Module } from '@nestjs/common';
import { TodoInformationsService } from './todo_informations.service';
import { TodoInformationsController } from './todo_informations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoInformation } from './entities/todo_information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoInformation])],
  controllers: [TodoInformationsController],
  providers: [TodoInformationsService],
})
export class TodoInformationsModule {}
