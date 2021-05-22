import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@src/common/base.repository';
import { JourneysRepository } from '@src/journeys/journeys.repository';

import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversRepository extends BaseRepository<Driver> {
  constructor(private readonly journeysRepository: JourneysRepository) {
    super();
  }

  serialize = (record: Driver): Driver => {
    return {
      ...record,
      journeys: this.journeysRepository.find({ driverId: record.id }),
    };
  };
}
