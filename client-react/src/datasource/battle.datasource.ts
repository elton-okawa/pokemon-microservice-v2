import Container, { Service } from "typedi";
import { SetStateAction, Dispatch } from "react";

import { BattleModel } from "src/model";
import { HttpClient } from "./http-client";
import { Commands } from "./commands";

@Service()
export class BattleDatasource {

  httpClient: HttpClient;

  constructor(
  ) {
    this.httpClient = Container.get(HttpClient);
  }

  async getBattles(): Promise<BattleModel[]> {
    try {
      const response = await this.httpClient.post('/', { command: Commands.BattleList });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}