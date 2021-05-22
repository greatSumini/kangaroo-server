import * as faker from 'faker';

import { getRandomEle, shuffleArray } from '@src/common/helpers/array';
import { uncleAvatarMocks } from '@src/common/mocks/avatar.mock';

import { Driver } from '../entities/driver.entity';
import { Car } from '../entities/car.entity';
import { carTypeMocks } from './car.mock';

const avatarUrls = shuffleArray<string>(uncleAvatarMocks);

export const driverMocks: Driver[] = [...Array(50)].map(
  (_, index) =>
    new Driver({
      name: faker.name.findName(),
      /** 30 ~ 50 */
      age: Math.floor(Math.random() * 20) + 30,
      avatarUrl: avatarUrls[index],
      /** 30 ~ 45 */
      averageSpeed: Math.floor(Math.random() * 15) + 30,
      car: new Car({
        type: getRandomEle(carTypeMocks),
        /** 2010 ~ 2020 */
        year: Math.floor(Math.random() * 10) + 2010,
      }),
    })
);
