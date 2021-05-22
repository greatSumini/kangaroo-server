import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@src/common/base.repository';

import { RouteEdge } from './entities/route-edge.entity';

@Injectable()
export class RouteEdgesRepository extends BaseRepository<RouteEdge> {}
