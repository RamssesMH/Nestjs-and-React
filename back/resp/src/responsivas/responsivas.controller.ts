import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, StreamableFile } from '@nestjs/common';
import { ResponsivasService } from './responsivas.service';
import { CreateResponsivaDto } from './dto/create-responsiva.dto';
import { UpdateResponsivaDto } from './dto/update-responsiva.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/paginatiom.dto';
import path = require('path');


@Controller('responsivas')
export class ResponsivasController {
  constructor(private readonly responsivasService: ResponsivasService) {}

  @Post()
  create(@Body() createResponsivaDto: CreateResponsivaDto) {
    return this.responsivasService.create(createResponsivaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.responsivasService.findAll( paginationDto );
  }
  
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.responsivasService.findOne(term);
  }

  @Get('pdf/download/'+':term')
    async generapdf(@Param('term') term: string, @Res() res): Promise<void> {
      const buffer = await this.responsivasService.generaPdf(term);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=responsiva.pdf',
        'Content-Length': buffer.length,
      })
      res.end(buffer);
    }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateResponsivaDto: UpdateResponsivaDto) {
    return this.responsivasService.update( term, updateResponsivaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.responsivasService.remove( id );
  }
}
