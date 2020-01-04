import Container, { Service } from "typedi";
import { SetStateAction, Dispatch } from "react";

import { AllChallengesModel } from "src/model";
import { HttpClient } from "./http-client";
import { Commands } from "./commands";

@Service()
export class ChallengeDatasource {

  httpClient: HttpClient;

  constructor (
  ) {
    this.httpClient= Container.get(HttpClient);
  }

  async getChallenges(setChallenges: Dispatch<SetStateAction<AllChallengesModel>>): Promise<void> {
    try {
      const response = await this.httpClient.post('/', { command: Commands.ChallengeList });
      setChallenges(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}