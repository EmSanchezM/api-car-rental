import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto, UpdateRentalDto } from './dto';
import { PrismaService } from 'src/orm/orm.service';
import { PaginationDto } from 'src/common';

@Injectable()
export class RentalsService {
  constructor(private prisma: PrismaService) {}

  create(createRentalDto: CreateRentalDto) {
    return this.prisma.rental.create({
      data: createRentalDto,
    });
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;

    const totalPages = await this.prisma.rental.count();
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.rental.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          rentalDate: true,
          rentalNumber: true,
          returnDate: true,
          arrivalTime: true,
          departureTime: true,
          lodgingDate: true,
          payment: true,
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
    const rental = await this.prisma.rental.findUnique({
      where: { id },
      select: {
        id: true,
        rentalDate: true,
        rentalNumber: true,
        returnDate: true,
        arrivalTime: true,
        departureTime: true,
        lodgingDate: true,
        payment: true,
      },
    });

    if (!rental) throw new NotFoundException('Rental not found');

    return rental;
  }

  async update(id: number, updateRentalDto: UpdateRentalDto) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) throw new NotFoundException('Rental not found');

    return this.prisma.rental.update({
      data: updateRentalDto,
      where: { id },
      select: {
        id: true,
        rentalDate: true,
        rentalNumber: true,
        returnDate: true,
        arrivalTime: true,
        departureTime: true,
        lodgingDate: true,
        payment: true,
      },
    });
  }

  async remove(id: number) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) throw new NotFoundException('Rental not found');

    return this.prisma.rental.delete({
      where: { id },
      select: {
        id: true,
        rentalDate: true,
        rentalNumber: true,
        returnDate: true,
        arrivalTime: true,
        departureTime: true,
        lodgingDate: true,
        payment: true,
      },
    });
  }
}
