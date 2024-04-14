import { Test, TestingModule } from '@nestjs/testing';
import { RentalsService } from '../rentals.service';
import { OrmModule } from 'src/orm/orm.module';

describe('RentalsService', () => {
  let service: RentalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrmModule],
      providers: [RentalsService],
    }).compile();

    service = module.get<RentalsService>(RentalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
