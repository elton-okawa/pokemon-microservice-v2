import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Container, { Service, Inject } from "typedi";

import { POKEMON_SERVICE_BASE_URL } from 'src/env.constants';

@Service()
export class HttpClient {
  httpClient: AxiosInstance;

  constructor(
  ) {
    this.httpClient = Axios.create({ 
      baseURL: Container.get(POKEMON_SERVICE_BASE_URL),
      headers: {
        "Access-Control-Allow-Origin": Container.get(POKEMON_SERVICE_BASE_URL),
      }
    });
    console.info(`Requesting to ${Container.get(POKEMON_SERVICE_BASE_URL)}`);
  }

  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.httpClient.get(url, config);
  }

  post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.httpClient.post(url, data, config);
  }
}