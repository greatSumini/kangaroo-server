import { shuffleArray } from '@src/common/helpers/array';
import { uncleAvatarMocks } from '@src/common/mocks/avatar.mock';

import { DriverMbti, DriverMbtiType } from '../entities/driver-mbti.entity';
import { Driver } from '../entities/driver.entity';

const avatarUrls = shuffleArray<string>(uncleAvatarMocks);

const DRIVER_COUNT = 20;

export const driverMbtiMockData: DriverMbti[] = [
  { type: DriverMbtiType.Safe, name: 'Safety first' },
  { type: DriverMbtiType.Time, name: 'On time' },
  { type: DriverMbtiType.Heart, name: 'Heart of gold' },
  { type: DriverMbtiType.Love, name: 'Kids Lover' },
  { type: DriverMbtiType.Gentle, name: 'Gentle Driver' },
];

export const driverReviewTextMockData: string[] = [
  'He’s a super super nice driver.',
  'Thanks you very much! Hope to see you again!',
  'I do love his vibe.',
  'What a wonderful drive!',
  'Kind, Gentle, and often humorous',
  'He is superb driver',
  'Thank you for nice driving :)',
  'Love your kindness!',
];

export const driverMocks: Driver[] = [...Array(DRIVER_COUNT)].map(
  (_, index) =>
    new Driver({
      ...Driver.mock(),
      avatarUrl: avatarUrls[index],
    })
);
