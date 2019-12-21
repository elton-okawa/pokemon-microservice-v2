import Container, { Service } from "typedi";
import grpc from 'grpc';
import path from 'path';

import { ProtoService } from "src/proto";
import { Command } from "./command";

const TRAINER_COMMAND = 'trainer';
const PROTO_PATH = path.join(process.cwd(), '../trainer/proto/grpc/trainer/trainer.proto');

@Service()
export class TrainerCommand extends Command {
  
  private trainer;

  constructor(
    private readonly protoService: ProtoService,
  ) {
    super(TRAINER_COMMAND);

    const protoDescriptor = this.protoService.getProtoDescriptor(PROTO_PATH);
    this.trainer = protoDescriptor.trainer as any;
  }

  async do(args: any[]) {
    try {
      const stub = new this.trainer.Trainer('localhost:50051', grpc.credentials.createInsecure());
      const promiseRes = new Promise((resolve, reject) => {
        stub.getTrainer({ id: args[1] }, (err, trainer) => {
          if (err) {
            reject(err);
          } else {
            resolve(trainer);
          }
        });
      });
      return await promiseRes;
    } catch (error) {
      if (error.response) {
        return `[Status: ${error.response.status}] ${error.response.data}`;
      } else {
        return error.message;
      }
    }
  }

  getUsage(): string {
    return `${TRAINER_COMMAND}`;
  }
}