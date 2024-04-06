import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './modules/cars/car.module';
import { RentalsModule } from './modules/rentals/rentals.module';

@Module({
  imports: [CarModule, RentalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
