import { getManager } from 'typeorm';
import { PushSubscription } from 'web-push';

import { Subscription } from '../entity/Subscription';
import { User } from '../entity/User';

export async function findOrCreate(sub: PushSubscription) {
  const subsRepo = getManager().getRepository(Subscription);
  const {
    endpoint,
    keys: { p256dh, auth },
  } = sub;
  let subscription = await subsRepo.findOne({ endpoint });
  if (!subscription) {
    subscription = await subsRepo.create({ endpoint, auth, p256dh });
    await subsRepo.save(subscription);
  }
  return subscription;
}

export async function addToUser(user: User, subscription: Subscription) {
  const subsRepo = getManager().getRepository(Subscription);
  subscription.user = user;
  await subsRepo.save(subscription);
}
