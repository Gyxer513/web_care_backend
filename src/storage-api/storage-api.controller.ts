import { Controller, Get, Post } from '@nestjs/common';
import { StorageApiService } from './storage-api.service';

@Controller('storage-api')
export class StorageApiController {
  constructor(private readonly storageApiService: StorageApiService) {}

  @Post()
  async getAllData() {
    return await this.storageApiService.updateToken();
  }
}
