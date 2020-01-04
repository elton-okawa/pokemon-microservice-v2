import path from 'path';
import grpc from 'grpc';
import { Container } from 'typedi';
import * as protoLoader from '@grpc/proto-loader';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

import { ProtoService } from './proto';

const PROTO_ROOT_PATH = path.join(process.cwd(), 'proto', 'grpc');

const db = new JsonDB(new Config("data", true, false, '/'));

function getTrainer(call, callback) {
  const trainer = db.getData(`/trainer/${call.request.id}`);
  console.info(trainer);
  callback(null, trainer);
}

function getTrainerList(call, callback) {
  const trainerList = db.filter('/trainer', entry => entry);
  console.info(trainerList);
  callback(null, { trainers: trainerList });
}

function checkHandler(call, callback) {
  callback(null, { status: 'SERVING' });
}

async function main() {
  const protoService = Container.get(ProtoService);
  
  const trainer = protoService.getProtoDescriptor(path.join(PROTO_ROOT_PATH, 'trainer', 'trainer.proto')).trainer as any;
  const health = (protoService.getProtoDescriptor(path.join(PROTO_ROOT_PATH, 'health', 'v1', 'health.proto')).grpc as any).health.v1;

  const server = new grpc.Server();
  server.addService(trainer.Trainer.service, {
    getTrainer,
    getTrainerList,
  });

  server.addService(health.Health.service, {
    Check: checkHandler,
  });

  const port = process.env.PORT || 50051;
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
  server.start();
  console.info(`TrainerService listening to ${port}`);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();