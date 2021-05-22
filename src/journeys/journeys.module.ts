import { Module } from '@nestjs/common';

import { RoutesModule } from '@src/routes/routes.module';

import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { JourneysRepository } from './journeys.repository';

@Module({
  imports: [RoutesModule],
  controllers: [JourneysController],
  providers: [JourneysService, JourneysRepository],
  exports: [JourneysRepository],
})
export class JourneysModule {}
