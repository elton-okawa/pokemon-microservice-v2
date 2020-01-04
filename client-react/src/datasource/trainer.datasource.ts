import Container, { Service } from "typedi";
import { SetStateAction, Dispatch } from "react";

import { TrainerModel } from "src/model";
import { HttpClient } from "./http-client";
import { Commands } from "./commands";

@Service()
export class TrainerDatasource {

  httpClient: HttpClient;

  constructor(
  ) {
    this.httpClient = Container.get(HttpClient);
  }

  async getTrainers(): Promise<TrainerModel[]> {
    try {
      const response = await this.httpClient.post('/', { command: Commands.TrainerList });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}