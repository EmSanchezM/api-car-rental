import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from './dto';
import { PrismaService } from 'src/orm';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async create(createCarDto: CreateCarDto) {
    try {
      const { carModel, carNumber, carStatus, rentPrize, driver } =
        createCarDto;

      const car = await this.prisma.car.create({
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

      return car;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.prisma.car.findMany();
  }

  async findOne(id: number) {
    try {
      const car = this.prisma.car.findUnique({
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
