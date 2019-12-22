import { Service } from "typedi";
import { PubSub } from '@google-cloud/pubsub';

@Service()
export class PubSubService {
  private pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub({ projectId: 'pokemon-microservice-262723' });
  }

  subscribe(subscriptionName: string, handler: (message) => void): void {
    this.pubsub.subscription(subscriptionName).on('message', handler);
  }
}