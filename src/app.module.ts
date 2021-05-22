import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { JourneysModule } from './journeys/journeys.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [UsersModule, JourneysModule, DriversModule, RoutesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
