import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class BaseIdEntity {
  @ApiProperty()
  @IsUUID()
  @Exclude()
  id: string;

  constructor(attributes?: Partial<BaseIdEntity>) {
    if (!attributes) {
      return;
    }

    if (attributes.id) {
      this.id = attributes.id;
    } else {
      this.id = uuidv4();
    }
  }
}
