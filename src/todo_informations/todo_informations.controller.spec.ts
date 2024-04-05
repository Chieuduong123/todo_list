import { Test, TestingModule } from '@nestjs/testing';
import { TodoInformationsController } from './todo_informations.controller';
import { TodoInformationsService } from './todo_informations.service';

describe('TodoInformationsController', () => {
  let controller: TodoInformationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoInformationsController],
      providers: [TodoInformationsService],
    }).compile();

    controller = module.get<TodoInformationsController>(TodoInformationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
