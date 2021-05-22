import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@src/common/base.repository';

import { Journey } from './entities/journey.entity';

@Injectable()
export class JourneysRepository extends BaseRepository<Journey> {}
