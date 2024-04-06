import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class DriverCarDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  commission: number;
}

export class CreateCarDto {
  @IsNumber()
  @IsPositive()
  readonly carNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly carModel: string;

  @IsString()
  @IsNotEmpty()
  readonly carStatus: string;

  @IsNumber()
  @IsPositive()
  readonly rentPrize: number;

  @IsNotEmpty()
  readonly driver: DriverCarDto;
}
