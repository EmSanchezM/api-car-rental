import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from './dto';
import { PrismaService } from 'src/orm/orm.service';
import { PaginationDto } from 'src/common';

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
      select: {
        id: true,
        carModel: true,
        carNumber: true,
        carStatus: true,
        rentPrize: true,
      },
    });
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;

    const totalPages = await this.prisma.car.count();
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.car.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          carModel: true,
          carNumber: true,
          carStatus: true,
          rentPrize: true,
          driver: true,
          createdAt: true,
        },
      }),
      meta: {
        total: totalPages,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const car = await this.prisma.car.findFirst({
      where: { id },
      select: {
        id: true,
        carModel: true,
        carNumber: true,
        carStatus: true,
        rentPrize: true,
      },
    });

    if (!car) throw new NotFoundException('Car not found');

    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const { carModel, carNumber, carStatus, rentPrize } = updateCarDto;

    const car = await this.prisma.car.findUnique({ where: { id } });

    if (!car) throw new NotFoundException('Car not found');

    return this.prisma.car.update({
      data: {
        carModel,
        carNumber,
        carStatus,
        rentPrize,
      },
      where: { id },
      select: {
        id: true,
        carModel: true,
        carNumber: true,
        carStatus: true,
        rentPrize: true,
      },
    });
  }

  async remove(id: number) {
    const car = await this.prisma.car.findUnique({ where: { id } });

    if (!car) throw new NotFoundException('Car not found');

    return this.prisma.car.delete({
      where: { id },
      select: {
        id: true,
        carModel: true,
        carNumber: true,
        carStatus: true,
        rentPrize: true,
      },
    });
  }
}
