import { IsISO8601, IsNumber, IsPositive } from 'class-validator';

export class CreateRentalDto {
  @IsNumber()
  @IsPositive()
  rentalNumber: number;

  @IsISO8601({ strict: true })
  rentalDate: string;

  @IsISO8601({ strict: true })
  departureTime: string;

  @IsISO8601({ strict: true })
  arrivalTime: string;

  @IsISO8601({ strict: true })
  lodgingDate: string;

  @IsISO8601({ strict: true })
  returnDate: string;

  @IsNumber()
  @IsPositive()
  payment: number;
}
