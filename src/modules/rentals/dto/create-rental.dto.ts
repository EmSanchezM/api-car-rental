import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class CreateRentalDto {
  @IsNumber()
  @IsPositive()
  rentalNumber: number;

  @IsDate()
  rentalDate: Date;

  @IsDate()
  departureTime: Date;

  @IsDate()
  arrivalTime: Date;

  @IsDate()
  lodgingDate: Date;

  @IsDate()
  returnDate: Date;

  @IsNumber()
  @IsPositive()
  payment: number;
}
