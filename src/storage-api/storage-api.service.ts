import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { IAllApiData, IClient } from './storage-api.types';

@Injectable()
export class StorageApiService {
  baseUrl: string;
  login: string;
  password: string;
  base64Credentials: string;
  private readonly logger = new Logger(StorageApiService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get('MY_STORE_URL');
    this.login = this.configService.get('USER_NAME');
    this.password = this.configService.get('USER_PASSWORD');
    this.base64Credentials = btoa(`${this.login}:${this.password}`);
  }

  /*async getAllData() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<IAllApiData>(`${this.baseUrl}`, {
          headers: {
            Authorization: `Basic ${this.base64Credentials}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw `Ошибка при получении токена ${this.base64Credentials}`;
          }),
        ),
    );
    return data;
  }*/

  async getPaginationData(limit: string, offset: string) {
    const base64Credentials = btoa(`${this.login}:${this.password}`);
    const { data } = await firstValueFrom(
      this.httpService
        .get<IClient>(`${this.baseUrl}?limit=${limit}&offset=${offset}`, {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw `Ошибка ${error.response.data}`;
          }),
        ),
    );
    return data;
  }
}
