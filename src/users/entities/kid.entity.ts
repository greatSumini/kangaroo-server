import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, Min } from 'class-validator';
import * as faker from 'faker';

import { BaseIdEntity } from '@src/common/base.entity';
import { getRandomNumBetween } from '@src/common/helpers/number';
import { getRandomEle } from '@src/common/helpers/array';
import { kidAvatarMocks } from '@src/common/mocks/avatar.mock';

export class Kid extends BaseIdEntity {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  age: number;

  @ApiProperty()
  @IsUrl()
  avatarUrl: string;

  @ApiProperty()
  @IsString()
  name: string;

  constructor(attributes?: Partial<Kid>) {
    super(attributes);
    if (!attributes) {
      return;
    }
    this.age = attributes.age;
    this.avatarUrl = attributes.avatarUrl;
    this.name = attributes.name;
  }

  static mock(): Kid {
    return new Kid({
      age: getRandomNumBetween(7, 10),
      name: faker.name.findName(),
      avatarUrl: getRandomEle(kidAvatarMocks),
    });
  }
}
