import { Context } from 'koa';

import * as ChannelController from '../controller/ChannelController';

export async function getAllChannels(context: Context) {
  const channels = await ChannelController.getAll();
  context.body = channels;
}

export async function createChannel(context: Context) {
  const { channel: newChannel } = context.body;
  const channel = ChannelController.findOrCreate(newChannel);
  context.body = channel;
}
