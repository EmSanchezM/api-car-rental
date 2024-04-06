import { Injectable } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from './dto';
import { PrismaService } from 'src/orm';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  create(createCarDto: CreateCarDto) {
    const { carModel, carNumber, carStatus, rentPrize, driver } = createCarDto;

    return this.prisma.car.create({
      data: {
        carModel,
        carNumber,
        carStatus,
        rentPrize,
        driver: {
          ...driver,
        },
      },
    });
  }

  findAll() {
    return this.prisma.car.findMany();
  }

  findOne(id: number) {
    return this.prisma.car.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    const { carModel, carNumber, carStatus, rentPrize } = updateCarDto;

    return this.prisma.car.update({
      data: {
        carModel,
        carNumber,
        carStatus,
        rentPrize,
      },
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.car.delete({ where: { id } });
  }
}
