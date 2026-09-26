import { SectorsService } from './sectors.service.js';
import { Controller, Get } from '@nestjs/common';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Get()
  findAdd() {
    return this.sectorsService.findAll();
  }
}
