import { getManager } from 'typeorm';

import { Channel } from '../entity/Channel';
import { Subscription } from '../entity/Subscription';
import { User } from '../entity/User';

export async function findOrCreate(username: string, name: string): Promise<User> {
  const userRepo = getManager().getRepository(User);
  let user = await userRepo.findOne({ userId: username });
  if (!user) {
    user = await userRepo.create({
      userId: username,
      name,
    });
    user = await userRepo.save(user);
  }
  return user;
}

export async function setChannels(userId: string, channelNames: string[]) {
  const userRepo = getManager().getRepository(User);
  const channelRepo = getManager().getRepository(Channel);
  const user = await userRepo.findOne({ userId });
  if (channelNames.length) {
    const channels = await channelRepo.find({ where: channelNames.map((name) => ({ name })) });
    user.channels = channels;
  } else {
    user.channels = [];
  }
  userRepo.save(user);
  return user.channels;
}

export async function getChannels(userId: string) {
  const userRepo = getManager().getRepository(User);
  const [user] = await userRepo.find({ where: { userId }, relations: ['channels'] });
  return user.channels;
}

export async function getSubsForUsers(userIds: string[]) {
  const userRepo = getManager().getRepository(User);
  const users = await userRepo.find({ where: userIds, relations: ['subscriptions'] });
  const subscriptions = users
    .map((user) => user.subscriptions)
    .reduce<Subscription[]>((allSubs, userSubs) => [...allSubs, ...userSubs], []);
  return subscriptions;
}
