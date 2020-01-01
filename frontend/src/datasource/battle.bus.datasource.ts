import { Service } from "typedi";
import grpc from 'grpc';
import path from 'path';

import { ProtoService } from "src/proto";

const PROTO_PATH = path.join(process.cwd(), './proto/grpc/battle/battle.proto');

@Service()
export class BattleBusDatasource {

  private battleStub;

  constructor(
    private readonly protoService: ProtoService,
  ) {
    const protoDescriptor = this.protoService.getProtoDescriptor(PROTO_PATH);
    const battle = protoDescriptor.battle as any;
    const battleServiceAddress = process.env.BATTLE_SERVICE_ADDR || 'localhost:50053';
    this.battleStub = new battle.BattleService(battleServiceAddress, grpc.credentials.createInsecure());

    console.info(`Requesting to ${battleServiceAddress}`);
  }

  getUserBattles(id: number): Promise<{ battles: any[] }> {
    const promiseRes = new Promise<{ battles: any[] }>((resolve, reject) => {
      this.battleStub.getBattleList({ id }, (err, battleList) => {
        if (err) {
          reject(err);
        } else {
          resolve(battleList);
        }
      });
    });

    return promiseRes;
  }

}