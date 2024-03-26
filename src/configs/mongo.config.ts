import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
  };
};

const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGODB_USERNAME') +
  ':' +
  configService.get('MONGODB_PASSWORD') +
  '@' +
  configService.get('MONGODB_HOST') +
  ':' +
  configService.get('MONGODB_PORT') +
  '/' +
  configService.get('MONGODB_DB_NAME') +
  '?authSource=admin&directConnection=true';
