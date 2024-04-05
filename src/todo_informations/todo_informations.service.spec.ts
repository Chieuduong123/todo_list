import { Test, TestingModule } from '@nestjs/testing';
import { TodoInformationsService } from './todo_informations.service';

describe('TodoInformationsService', () => {
  let service: TodoInformationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoInformationsService],
    }).compile();

    service = module.get<TodoInformationsService>(TodoInformationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
