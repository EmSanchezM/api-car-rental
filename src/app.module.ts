import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './modules/cars/car.module';
import { PrismaService } from './orm';

@Module({
  imports: [CarModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
