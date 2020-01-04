import Container, { Service } from "typedi";

import { HttpClient } from "./http-client";
import { Commands } from "./commands";

@Service()
export class LoginDatasource {

  httpClient: HttpClient;

  constructor(
  ) {
    this.httpClient = Container.get(HttpClient);
  }

  async login(userId: number): Promise<any> {
    try {
      const response = await this.httpClient.post('/', { command: Commands.Login, args: [userId] });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}