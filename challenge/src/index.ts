import path from 'path';
import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Container } from 'typedi';

import { PubSubService } from './pubsub';
import { ProtoService } from './proto';
import { ChallengeStatus } from './challenge-status';

const PROTO_PATH = path.join(process.cwd(), 'proto', 'grpc', 'challenge', 'challenge.proto');

const db = new JsonDB(new Config("data", true, false, '/'));
const SUBSCRIPTION_NAME = 'challenge-listen';

function subscribe(subscriptionName: string, handler: (message) => void) {
  const pubsub = Container.get(PubSubService);
  pubsub.subscribe(subscriptionName, handler);
}

async function main() {
  const protoService = Container.get(ProtoService);
  const trainerProto = protoService.getProtoDescriptor(PROTO_PATH).trainer as any;

  const challengeHandler = async (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);

    db.push(`/challenge/${message.id}`, { ...JSON.parse(message.data), status: ChallengeStatus.Pending })
    // "Ack" (acknowledge receipt of) the message
    message.ack();
  }

  subscribe(SUBSCRIPTION_NAME, challengeHandler);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();