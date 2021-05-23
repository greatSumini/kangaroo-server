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

  /** fmsReport는 매번 새로 생성한다.
   - (fmsReport.brakeStatus,batterySupplyVoltage는 바꾸지 않고 고정한다.) */
  serialize = (record: Driver): Driver => {
    const { brakeStatus, batterySupplyVoltage } = record.fmsReport;

    const journeys = this.journeysRepository.find({ driverId: record.id });

    return {
      ...record,
      journeys: [journeys[journeys.length - 1]],
      fmsReport: { ...FmsReport.mock(), brakeStatus, batterySupplyVoltage },
    };
  };
}
