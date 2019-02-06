import { getManager } from 'typeorm';

import { Channel, ICreateChannel } from '../entity/Channel';
import { Subscription } from '../entity/Subscription';
import { User } from '../entity/User';

export async function find(name: string): Promise<Channel | null> {
  const channelRepo = getManager().getRepository(Channel);
  const channel = await channelRepo.findOne({ name });
  return channel || null;
}

export async function getAll(): Promise<Channel[]> {
  const channelRepo = getManager().getRepository(Channel);
  const channels = await channelRepo.find();
  return channels
}


export async function findOrCreate(incoming: ICreateChannel) {
  const channelRepo = getManager().getRepository(Channel);

  let channel = await channelRepo.findOne({ name: incoming.name });
  if (!channel) {
    channel = await channelRepo.create(incoming);
    await channelRepo.save(channel);
  }
  return channel;
}

export async function addSubscription(user: User, channelName: string) {
  const channelRepo = getManager().getRepository(Channel);
  const channel = await channelRepo.findOne({ name: channelName }, { relations: ['subscribers'] });
  if (!channel.subscribers) {
    channel.subscribers = [];
  }
  channel.subscribers.push(user);
  await channelRepo.save(channel);
}

export async function getAllSubscriptions(channelName: string) {
  const channelRepo = getManager().getRepository(Channel);
  const userRepo = getManager().getRepository(User);

  const channel = await channelRepo.findOne({ name: channelName }, { relations: ['subscribers'] });
  const userIds = channel.subscribers.map(({ userId }) => ({ userId }));
  const users = await userRepo.find({ where: userIds, relations: ['subscriptions'] });
  const subscriptions = users
    .map((user) => user.subscriptions)
    .reduce<Subscription[]>((allSubs, userSubs) => [...allSubs, ...userSubs], []);
  return subscriptions;
}
