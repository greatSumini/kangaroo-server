import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, Min } from 'class-validator';

import { BaseIdEntity } from '@src/common/base.entity';

export class Kid extends BaseIdEntity {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  age: string;

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
}
