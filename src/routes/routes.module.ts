import { Module } from '@nestjs/common';

import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { RouteEdgesRepository } from './routes.repository';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService, RouteEdgesRepository],
})
export class RoutesModule {}
