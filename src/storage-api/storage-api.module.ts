import { Module } from '@nestjs/common';
import { StorageApiService } from './storage-api.service';
import { StorageApiController } from './storage-api.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [StorageApiController],
  providers: [StorageApiService],
})
export class StorageApiModule {}
