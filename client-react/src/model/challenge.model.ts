import { TrainerModel } from "./trainer.model";

export interface ChallengeModel {
  id: string;
  user: TrainerModel;
  opponent: TrainerModel;
  status: string;
}