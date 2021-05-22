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

  @ApiProperty({
    type: [RouteEdge],
  })
  availables: RouteEdge[];

  constructor(attributes?: Partial<RouteEdge>) {
    super(attributes);
    if (!attributes) {
      return;
    }

    this.lat = attributes.lat;
    this.lng = attributes.lng;

    this.availables = attributes.availables;
  }
}
