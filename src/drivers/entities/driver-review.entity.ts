import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class DriverReview {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  constructor(attributes?: Partial<DriverReview>) {
    if (!attributes) {
      return;
    }

    this.text = attributes.text;
    this.createdAt = attributes.createdAt;
  }
}
