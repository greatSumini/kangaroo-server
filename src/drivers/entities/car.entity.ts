import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { BaseIdEntity } from '@src/common/base.entity';

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
}
