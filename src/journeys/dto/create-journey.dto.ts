import { OmitType } from '@nestjs/swagger';

import { Journey } from '../entities/journey.entity';

export class CreateJourneyDto extends OmitType(Journey, ['id']) {}
