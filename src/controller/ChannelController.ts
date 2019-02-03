import { getManager } from 'typeorm';

import { Channel, ICreateChannel } from '../entity/Channel';
import { Subscription } from '../entity/Subscription';

export async function find(name: string): Promise<Channel | null> {
  const channelRepo = getManager().getRepository(Channel);
  const channel = await channelRepo.findOne({ name });
  return channel || null;
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

export async function addSubscription(sub: Subscription, channel: Channel) {
  const channelRepo = getManager().getRepository(Channel);
  if (!channel.subscribers) {
    channel.subscribers = [];
  }
  channel.subscribers.push(sub);
  await channelRepo.save(channel);
}
