import { getManager } from 'typeorm';
import { PushSubscription } from 'web-push';

import { Subscription } from '../entity/Subscription';
import { User } from '../entity/User';

export async function findOrCreate(sub: PushSubscription) {
  const subscriptionRepository = getManager().getRepository(Subscription);
  const {
    endpoint,
    keys: { p256dh, auth },
  } = sub;
  let subscription = await subscriptionRepository.findOne({ endpoint });
  if (!subscription) {
    subscription = await subscriptionRepository.create({ endpoint, auth, p256dh });
    await subscriptionRepository.save(subscription);
  }
  return subscription;
}

export async function addToUser(user: User, subscription: Subscription) {
  const subscriptionRepository = getManager().getRepository(Subscription);
  subscription.user = user;
  await subscriptionRepository.save(subscription);
}
