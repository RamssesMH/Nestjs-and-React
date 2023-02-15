import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsivaDto } from './create-responsiva.dto';

export class UpdateResponsivaDto extends PartialType(CreateResponsivaDto) {}
