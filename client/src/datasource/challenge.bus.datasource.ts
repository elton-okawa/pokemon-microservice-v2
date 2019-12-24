import { Service } from "typedi";
import grpc from 'grpc';
import path from 'path';

import { ProtoService } from "src/proto";
import { ChallengeStatus } from "src/challenge-status";

const PROTO_PATH = path.join(process.cwd(), '../challenge/proto/grpc/challenge/challenge.proto');

@Service()
export class ChallengeBusDatasource {

  private challengeStub;

  constructor(
    private readonly protoService: ProtoService,
  ) {
    const protoDescriptor = this.protoService.getProtoDescriptor(PROTO_PATH);
    const challenge = protoDescriptor.challenge as any;
    this.challengeStub = new challenge.ChallengeService('localhost:50052', grpc.credentials.createInsecure());
  }

  getUserChallenges(id: number, status: ChallengeStatus[]): Promise<{ challenges: any[] }> {
    const promiseRes = new Promise<{ challenges: any[] }>((resolve, reject) => {
      this.challengeStub.getUserChallenges({ id, status }, (err, challengeList) => {
        if (err) {
          reject(err);
        } else {
          resolve(challengeList);
        }
      });
    });

    return promiseRes;
  }

  getOpponentChallenges(id: number, status: ChallengeStatus[]): Promise<{ challenges: any[] }> {
    const promiseRes = new Promise<{ challenges: any[] }>((resolve, reject) => {
      this.challengeStub.getOpponentChallenges({ id, status }, (err, challengeList) => {
        if (err) {
          reject(err);
        } else {
          resolve(challengeList);
        }
      });
    });

    return promiseRes;
  }

  getChallenges(id: number, status: ChallengeStatus[]): Promise<{ challenges: any[] }> {
    const promiseRes = new Promise<{ challenges: any[] }>((resolve, reject) => {
      this.challengeStub.getChallenges({ id, status }, (err, challengeList) => {
        if (err) {
          reject(err);
        } else {
          resolve(challengeList);
        }
      });
    });

    return promiseRes;
  } 
}