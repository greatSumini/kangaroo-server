import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { BaseIdEntity } from '@src/common/base.entity';
import { Journey } from '@src/journeys/entities/journey.entity';

import { Kid } from './kid.entity';

export class User extends BaseIdEntity {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty({
    type: [Kid],
    required: false,
    default: [],
  })
  @IsOptional()
  kids: Kid[];

  @ApiProperty({
    type: [Journey],
  })
  @IsOptional()
  journeys?: Journey[];

  constructor(attributes?: Partial<User>) {
    super(attributes);
    if (!attributes) {
      return;
    }
    this.nickname = attributes.nickname;

    this.kids = attributes.kids || [];
    this.journeys = attributes.journeys || [];
  }
}
