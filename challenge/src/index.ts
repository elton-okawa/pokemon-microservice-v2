import path from 'path';
import grpc from 'grpc';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Container } from 'typedi';

import { PubSubService } from './pubsub';
import { ProtoService } from './proto';
import { ChallengeStatus } from './challenge-status';

const PROTO_PATH = path.join(process.cwd(), 'proto', 'grpc', 'challenge', 'challenge.proto');

const db = new JsonDB(new Config("data", true, false, '/'));
const SUBSCRIPTION_CHALLENGE_LISTEN = 'challenge-listen';
const SUBSCRIPTION_CHALLENGE_RESOLVE_LISTEN = 'challenge-resolve-listen';
const BATTLE_TOPIC = 'battle';

function subscribe(subscriptionName: string, handler: (message) => void) {
  const pubsub = Container.get(PubSubService);
  pubsub.subscribe(subscriptionName, handler);
}

function getUserChallenges(call, callback) {
  const challengeList = db.filter(`/challenge`, (entry, index) => {
    return entry.user.id === call.request.id && call.request.status.includes(entry.status);
  });

  callback(null, { challenges: challengeList });
}

function getOpponentChallenges(call, callback) {
  const challengeList = db.filter(`/challenge`, (entry, index) => {
    return entry.opponent.id === call.request.id && call.request.status.includes(entry.status);
  });

  callback(null, { challenges: challengeList });
}

function getChallenges(call, callback) {
  const challengeList = db.filter(`/challenge`, (entry, index) => {
    const userOrOpponentChallenge = 
      entry.opponent.id === call.request.id || entry.user.id === call.request.id;
    return userOrOpponentChallenge && call.request.status.includes(entry.status);
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
    getChallenges,
  });

  server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
  server.start();
  
  subscribeToChallengeTopic();
  await subscribeToChallengeResolveTopic();
}

function subscribeToChallengeTopic() {
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

async function subscribeToChallengeResolveTopic() {
  const challengeResolveHandler = async (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    
    const messageData = JSON.parse(message.data);
    const challengeStatus = messageData.accepted ? ChallengeStatus.Accepted : ChallengeStatus.Refused;
    db.push(`/challenge/${messageData.id}`, { status: challengeStatus }, false);
    const challengeData = db.getData(`/challenge/${messageData.id}`);
    const pubsub = Container.get(PubSubService);
    const messageId = await pubsub.publish(BATTLE_TOPIC, Buffer.from(JSON.stringify(challengeData)));
    console.info(`MessageId ${messageId} published successfully`);

    message.ack();
  }

  subscribe(SUBSCRIPTION_CHALLENGE_RESOLVE_LISTEN, challengeResolveHandler);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})()
