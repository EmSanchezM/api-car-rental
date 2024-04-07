import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ROLES } from 'src/common';

export class SignUpAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @IsNumber()
  @IsPositive()
  @Min(16)
  @Max(150)
  readonly age: number;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  readonly password: string;

  @IsArray()
  readonly roles: ROLES[];
}
