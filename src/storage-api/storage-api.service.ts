import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageApiService {
  login: string;
  password: string;
  private readonly logger = new Logger(StorageApiService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.login = this.configService.get('USER_NAME');
    this.password = this.configService.get('USER_PASSWORD');
  }

  async updateToken(): Promise<string> {
    const base64Credentials = btoa(`${this.login}:${this.password}`);
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('https://api.moysklad.ru/api/remap/1.2/entity/counterparty', {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw `Ошибка при получении токена ${base64Credentials}`;
          }),
        ),
    );
    return data.rows;
  }

  /* async findAll(): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          'https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api',
         headers: {
      Authorization: `Basic ${base64Credentials}`,
    },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }*/
}
