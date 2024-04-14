import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from '../car.service';
import { OrmModule } from 'src/orm/orm.module';

describe('CarService', () => {
  let service: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrmModule],
      providers: [CarService],
    }).compile();

    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
