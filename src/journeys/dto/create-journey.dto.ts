import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { Journey } from '../entities/journey.entity';

export class CreateJourneyDto extends OmitType(Journey, [
  'id',
  'departAt',
  'arriveAt',
  'departRouteEdge',
  'arriveRouteEdge',
]) {
  @ApiProperty()
  @IsUUID()
  departRouteEdgeId: string;

  @ApiProperty()
  @IsUUID()
  arriveRouteEdgeId: string;
}
