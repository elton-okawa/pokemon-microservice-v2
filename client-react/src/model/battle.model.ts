import { TrainerModel } from "./trainer.model";

export interface BattleModel {
  id: string;
  challengeId: string;
  user: TrainerModel;
  opponent: TrainerModel;
  winnerId: number;
}