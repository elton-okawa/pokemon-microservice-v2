import { Service } from "typedi";
import { PubSub } from '@google-cloud/pubsub';

@Service()
export class PubSubService {
  private pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub({ projectId: 'pokemon-microservice-262723' });
  }

  publish(topicName: string, dataBuffer: Buffer): Promise<string> {
    return this.pubsub.topic(topicName).publish(dataBuffer);
  }
}