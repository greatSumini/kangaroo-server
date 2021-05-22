import { Module } from '@nestjs/common';

import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { JourneysRepository } from './journeys.repository';

@Module({
  controllers: [JourneysController],
  providers: [JourneysService, JourneysRepository],
})
export class JourneysModule {}
