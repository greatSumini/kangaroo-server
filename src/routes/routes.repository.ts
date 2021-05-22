import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@src/common/base.repository';

import { RouteEdge } from './entities/route-edge.entity';
import { routeEdgeMocks } from './mocks/route.mock';

@Injectable()
export class RouteEdgesRepository extends BaseRepository<RouteEdge> {
  records = routeEdgeMocks;
}
