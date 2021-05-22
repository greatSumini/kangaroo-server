import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@src/common/base.repository';
import { JourneysRepository } from '@src/journeys/journeys.repository';

import { Driver } from './entities/driver.entity';
import { FmsReport } from './entities/fms-report.entity';
import { driverMocks } from './mocks/driver.mock';

@Injectable()
export class DriversRepository extends BaseRepository<Driver> {
  constructor(private readonly journeysRepository: JourneysRepository) {
    super();
    this.records = driverMocks;
  }

  serialize = (record: Driver): Driver => {
    return {
      ...record,
      journeys: this.journeysRepository.find({ driverId: record.id }),
      fmsReport: FmsReport.mock(),
    };
  };
}
