import path from 'path';
import grpc from 'grpc';
import { Service } from "typedi";

import { ProtoService } from "src/proto";

const PROTO_PATH = path.join(process.cwd(), '../trainer/proto/grpc/trainer/trainer.proto');

@Service()
export class TrainerBusDatasource {

  private trainerStub;

  constructor(
    private readonly protoService: ProtoService,
  ) {
    const protoDescriptor = this.protoService.getProtoDescriptor(PROTO_PATH);
    const trainer = protoDescriptor.trainer as any;
    this.trainerStub = new trainer.Trainer('localhost:50051', grpc.credentials.createInsecure());
  }

  getTrainer(id: number) {
    const promiseRes = new Promise((resolve, reject) => {
      this.trainerStub.getTrainer({ id }, (err, trainer) => {
        if (err) {
          reject(err);
        } else {
          resolve(trainer);
        }
      });
    });

    return promiseRes;
  }
}