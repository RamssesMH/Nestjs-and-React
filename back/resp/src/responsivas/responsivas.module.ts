import { Module } from '@nestjs/common';
import { ResponsivasService } from './responsivas.service';
import { ResponsivasController } from './responsivas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Responsiva, ResponsivasSchema } from './entities/responsiva.entity';

@Module({
  controllers: [ResponsivasController],
  providers: [ResponsivasService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Responsiva.name,
        schema: ResponsivasSchema,
      }
    ])
  ]
})
export class ResponsivasModule {}
