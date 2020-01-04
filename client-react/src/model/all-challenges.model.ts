import { ChallengeModel } from "./challenge.model";

export interface AllChallengesModel {
  userChallenges: ChallengeModel[];
  opponentChallenges: ChallengeModel[];
  finishedChallenges: ChallengeModel[];
}