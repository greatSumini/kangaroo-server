import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { BaseIdEntity } from '@src/common/base.entity';
import { getRandomEle } from '@src/common/helpers/array';

import { carTypeMocks } from '../mocks/car.mock';

export class Car extends BaseIdEntity {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  constructor(attributes?: Partial<Car>) {
    super(attributes);
    if (!attributes) {
      return;
    }

    this.type = attributes.type;
    this.year = attributes.year;
  }

  static mock(): Car {
    return new Car({
      type: getRandomEle(carTypeMocks),
      /** 2018 ~ 2021 */
      year: Math.floor(Math.random() * 3) + 2018,
    });
  }
}
