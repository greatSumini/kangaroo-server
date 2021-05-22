import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JourneysModule } from './journeys/journeys.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, JourneysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
