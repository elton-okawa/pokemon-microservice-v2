import path from 'path';
import grpc from 'grpc';
import { Service } from "typedi";

import { ProtoService } from "src/proto";

const PROTO_PATH = path.join(process.cwd(), './proto/grpc/trainer/trainer.proto');

@Service()
export class TrainerBusDatasource {

  private trainerStub;

  constructor(
    private readonly protoService: ProtoService,
  ) {
    const protoDescriptor = this.protoService.getProtoDescriptor(PROTO_PATH);
    const trainer = protoDescriptor.trainer as any;
    const trainerServiceAddress = process.env.TRAINER_SERVICE_ADDR || 'localhost:50051';
    this.trainerStub = new trainer.Trainer(trainerServiceAddress, grpc.credentials.createInsecure());

    console.info(`Requesting to ${trainerServiceAddress}`);
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