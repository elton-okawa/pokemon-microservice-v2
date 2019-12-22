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
const SUBSCRIPTION_CHALLENGE_LISTEN = 'challenge-listen';

function subscribe(subscriptionName: string, handler: (message) => void) {
  const pubsub = Container.get(PubSubService);
  pubsub.subscribe(subscriptionName, handler);
}

function getUserChallenges(call, callback) {
  const challengeList = db.filter(`/challenge`, (entry, index) => {
    return entry.user.id === call.request.id && entry.status === ChallengeStatus.Pending;
  });
  
  callback(null, { challenges: challengeList });
}

function getOpponentChallenges(call, callback) {
  const challengeList = db.filter(`/challenge`, (entry, index) => {
    return entry.opponent.id === call.request.id && entry.status === ChallengeStatus.Pending;
  });

  callback(null, { challenges: challengeList });
}

async function main() {
  const protoService = Container.get(ProtoService);
  const challengeProto = protoService.getProtoDescriptor(PROTO_PATH).challenge as any;
  const server = new grpc.Server();
  server.addService(challengeProto.ChallengeService.service, {
    getUserChallenges,
    getOpponentChallenges,
  });

  server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
  server.start();

  const challengeHandler = async (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);

    db.push(`/challenge/${message.id}`, { ...JSON.parse(message.data), status: ChallengeStatus.Pending, id: message.id });
    // "Ack" (acknowledge receipt of) the message
    message.ack();
  }

  subscribe(SUBSCRIPTION_CHALLENGE_LISTEN, challengeHandler);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();