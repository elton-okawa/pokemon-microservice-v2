import path from 'path';
import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Container } from 'typedi';

import { ProtoService } from './proto';
import { PubSubService } from './pubsub';

const SUBSCRIPTION_BATTLE_LISTEN = 'battle-listen';
const PROTO_PATH = path.join(process.cwd(), 'proto', 'grpc', 'battle', 'battle.proto');

const db = new JsonDB(new Config("data", true, false, '/'));

function getBattleList(call, callback) {
  const battleList = db.filter('/battles', entry => {
    return entry.user.id === call.request.id || entry.opponent.id === call.request.id;
  });
  
  callback(null, { battles: battleList });
}

function subscribeToBattleTopic() {
  const battleHandler = async (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
  
    const messageData = JSON.parse(message.data);
    const battleData = {
      id: message.id,
      challengeId: messageData.id,
      user: messageData.user,
      opponent: messageData.opponent,
      winnerId: Math.random() < 0.5 ? messageData.user.id : messageData.opponent.id,
    }
    db.push(`/battles/${message.id}`, battleData);
    // "Ack" (acknowledge receipt of) the message
    message.ack();
  }

  const pubSubService = Container.get(PubSubService);
  pubSubService.subscribe(SUBSCRIPTION_BATTLE_LISTEN, battleHandler);
}


async function main() {
  const protoService = Container.get(ProtoService);
  const protoDescriptor = protoService.getProtoDescriptor(PROTO_PATH);
  const battle = protoDescriptor.battle as any;

  const server = new grpc.Server();
  server.addService(battle.BattleService.service, {
    getBattleList,
  });

  const port = process.env.PORT || 50053;
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
  server.start();
  console.info(`BattleService is listening to ${port}`);

  subscribeToBattleTopic();
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();