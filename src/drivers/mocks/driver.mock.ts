import { shuffleArray } from '@src/common/helpers/array';
import { uncleAvatarMocks } from '@src/common/mocks/avatar.mock';

import { Driver } from '../entities/driver.entity';

const avatarUrls = shuffleArray<string>(uncleAvatarMocks);

const DRIVER_COUNT = 20;

export const driverMocks: Driver[] = [...Array(DRIVER_COUNT)].map(
  (_, index) =>
    new Driver({
      ...Driver.mock(),
      avatarUrl: avatarUrls[index],
    })
);
