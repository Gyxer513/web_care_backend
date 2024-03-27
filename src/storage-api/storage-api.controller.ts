import { Controller, Get, Query } from '@nestjs/common';
import { StorageApiService } from './storage-api.service';
import { IQueryType } from './storage-api.types';
import { ApiTags } from '@nestjs/swagger';

@Controller('storage-api')
@ApiTags('Storage-api')
export class StorageApiController {
  constructor(private readonly storageApiService: StorageApiService) {}

  /*@Get()
  async getAllData() {
    return await this.storageApiService.getAllData();
  }*/

  @Get()
  async getPaginationUserData(@Query() query: IQueryType) {
    return await this.storageApiService.getPaginationData(query.limit, query.offset);
  }
}
