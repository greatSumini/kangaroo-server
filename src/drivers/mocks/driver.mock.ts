import { shuffleArray } from '@src/common/helpers/array';
import { uncleAvatarMocks } from '@src/common/mocks/avatar.mock';

import { Driver } from '../entities/driver.entity';

const avatarUrls = shuffleArray<string>(uncleAvatarMocks);

export const driverMocks: Driver[] = [...Array(50)].map(
  (_, index) =>
    new Driver({
      ...Driver.mock(),
      avatarUrl: avatarUrls[index],
    })
);
