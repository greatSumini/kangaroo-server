import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

import { BaseIdEntity } from '@src/common/base.entity';
import { RouteEdge } from '@src/routes/entities/route-edge.entity';
import { Driver } from '@src/drivers/entities/driver.entity';

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

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID()
  kidId: string;

  @ApiProperty()
  @IsUUID()
  driverId: string;

  @ApiProperty({
    type: String,
    description: 'Driver 타입이 그대로 옵니다.',
  })
  driver: Driver;

  @ApiProperty({
    required: false,
    default: new Date(),
  })
  @IsDate()
  @IsOptional()
  departAt?: Date;

  @ApiProperty()
  @IsDate()
  arriveAt: Date;

  @ApiProperty({
    type: RouteEdge,
  })
  departRouteEdge: RouteEdge;

  @ApiProperty({
    type: RouteEdge,
  })
  arriveRouteEdge: RouteEdge;

  constructor(attributes?: Partial<Journey>) {
    super(attributes);
    if (!attributes) {
      return;
    }
    this.status = attributes.status || JourneyStatus.Pending;
    this.departAt = attributes.departAt || new Date();
    this.arriveAt = attributes.arriveAt;

    this.departRouteEdge = attributes.departRouteEdge;
    this.arriveRouteEdge = attributes.arriveRouteEdge;

    this.userId = attributes.userId;
    this.driverId = attributes.driverId;

    this.driver = attributes.driver;
  }
}
