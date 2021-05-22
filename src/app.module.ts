import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { JourneysModule } from './journeys/journeys.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [UsersModule, JourneysModule, DriversModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
