import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto, UpdateRentalDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalsService.create(createRentalDto);
  }

  @Get()
  findAll(@Param() pagination: PaginationDto) {
    return this.rentalsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalsService.update(+id, updateRentalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalsService.remove(+id);
  }
}
