import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

import { BaseIdEntity } from '@src/common/base.entity';

import { JourneyStatus } from '../interfaces/journey.interface';

export class Journey extends BaseIdEntity {
  @ApiProperty({
    enumName: 'JourneyStatus',
    enum: Object.values(JourneyStatus),
    default: JourneyStatus.Pending,
    required: false,
  })
  @IsEnum(JourneyStatus)
  @IsOptional()
  status: JourneyStatus;

  @ApiProperty({
    required: false,
    default: new Date(),
  })
  @IsDate()
  @IsOptional()
  departTime?: Date;

  @ApiProperty()
  @IsDate()
  arriveTime: Date;

  @ApiProperty()
  @IsUUID()
  routeId: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID()
  driverId: string;

  constructor(attributes?: Partial<Journey>) {
    super(attributes);
    if (!attributes) {
      return;
    }
    this.status = attributes.status || JourneyStatus.Pending;
    this.departTime = attributes.departTime || new Date();
    this.arriveTime = attributes.arriveTime;

    this.routeId = attributes.routeId;
    this.userId = attributes.userId;
    this.driverId = attributes.driverId;
  }
}
