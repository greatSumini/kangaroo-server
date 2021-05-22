import { forwardRef, Module } from '@nestjs/common';

import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { JourneysRepository } from './journeys.repository';
import { DriversModule } from '@src/drivers/drivers.module';

@Module({
  imports: [forwardRef(() => DriversModule)],
  controllers: [JourneysController],
  providers: [JourneysService, JourneysRepository],
  exports: [JourneysService, JourneysRepository],
})
export class JourneysModule {}
