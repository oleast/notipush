import { getManager } from 'typeorm';

import { Subscription } from '../entity/Subscription';
import { User } from '../entity/User';

export async function findOrCreate(endpoint: string) {
  const subscriptionRepository = getManager().getRepository(Subscription);

  let subscription = await subscriptionRepository.findOne({ endpoint });
  if (!subscription) {
    subscription = await subscriptionRepository.create({ endpoint });
    await subscriptionRepository.save(subscription);
  }
  return subscription;
}

export async function addToUser(user: User, subscription: Subscription) {
  const subscriptionRepository = getManager().getRepository(Subscription);
  subscription.user = user;
  await subscriptionRepository.save(subscription);
}
