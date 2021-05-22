import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { BaseIdEntity } from '@src/common/base.entity';
import { Kid } from './kid.entity';
import { Optional } from '@nestjs/common';

export class User extends BaseIdEntity {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty({
    type: [Kid],
  })
  @Optional()
  kids: Kid[];

  constructor(attributes?: Partial<User>) {
    super(attributes);
    if (!attributes) {
      return;
    }
    this.nickname = attributes.nickname;
    this.kids = attributes.kids || [];
  }
}
