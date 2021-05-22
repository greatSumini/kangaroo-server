import { ApiProperty } from '@nestjs/swagger';
import { BaseIdEntity } from '@src/common/base.entity';
import { IsNumber } from 'class-validator';

export class RouteEdge extends BaseIdEntity {
  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;
}
