import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { DriversRepository } from './drivers.repository';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Car } from './entities/car.entity';
import { Driver } from './entities/driver.entity';
import { FmsReport } from './entities/fms-report.entity';

@Injectable()
export class DriversService {
  constructor(private readonly driversRepository: DriversRepository) {}

  create(createDriverDto: CreateDriverDto): Driver {
    return this.driversRepository.create(
      new Driver({
        ...createDriverDto,
        car: Car.mock(),
        fmsReport: FmsReport.mock(),
      })
    );
  }

  findAll(): Driver[] {
    return this.driversRepository.find();
  }

  findOne(id: string): Driver {
    return this.driversRepository.findOne(id);
  }

  update(id: string, updateDriverDto: UpdateDriverDto): Driver {
    return this.driversRepository.update(id, updateDriverDto);
  }

  remove(id: string) {
    return this.driversRepository.remove(id);
  }

  /** 모든 Driver는 0.1초에 1번씩 움직인다. */
  @Cron('* * * * * *')
  async moveAll() {
    let i = 9;
    while (i--) {
      this.driversRepository.find().forEach((driver) => driver.move());
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
