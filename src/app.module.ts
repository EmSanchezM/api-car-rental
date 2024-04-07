import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './modules/cars/car.module';
import { RentalsModule } from './modules/rentals/rentals.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrmModule } from './orm/orm.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './modules/auth/guards';

@Module({
  imports: [CarModule, RentalsModule, AuthModule, OrmModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
