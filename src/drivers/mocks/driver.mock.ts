import * as faker from 'faker';

import { shuffleArray } from '@src/common/helpers/array';
import { uncleAvatarMocks } from '@src/common/mocks/avatar.mock';

import { Driver } from '../entities/driver.entity';
import { Car } from '../entities/car.entity';
import { FmsReport } from '../entities/fms-report.entity';

const avatarUrls = shuffleArray<string>(uncleAvatarMocks);

export const driverMocks: Driver[] = [...Array(50)].map(
  (_, index) =>
    new Driver({
      name: faker.name.findName(),
      /** 30 ~ 50 */
      age: Math.floor(Math.random() * 20) + 30,
      avatarUrl: avatarUrls[index],
      car: Car.mock(),
      fmsReport: FmsReport.mock(),
    })
);
