import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageApiModule } from './storage-api/storage-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StorageApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
