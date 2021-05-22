import { PickType } from '@nestjs/swagger';

import { Journey } from '../entities/journey.entity';

export class CreateJourneyDto extends PickType(Journey, ['userId', 'kidIds']) {}
