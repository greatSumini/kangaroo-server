import { Module } from '@nestjs/common';

import { JourneysModule } from '@src/journeys/journeys.module';

import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DriversRepository } from './drivers.repository';

@Module({
  imports: [JourneysModule],
  controllers: [DriversController],
  providers: [DriversService, DriversRepository],
})
export class DriversModule {}
