import path from 'path';
import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const PROTO_PATH = path.join(process.cwd(), 'proto', 'grpc', 'trainer', 'trainer.proto');

const db = new JsonDB(new Config("data", true, false, '/'));

function getTrainer(call, callback) {
  const trainer = db.getData(`/${call.request.id}`);
  console.log(trainer);
  callback(null, trainer);
}

async function main() {
  const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
  const trainer = protoDescriptor.trainer as any;

  const server = new grpc.Server();
  server.addService(trainer.Trainer.service, {
    getTrainer,
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