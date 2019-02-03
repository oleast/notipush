import { getManager } from 'typeorm';

import * as ChannelCotroller from './ChannelController';
import * as ActionController from './NotiActionCotroller';

import { ICreateNotification, Notification } from '../entity/Notification';
import { User } from '../entity/User';

export async function create({ users: userIds, channel: channelName, actions, ...incoming }: ICreateNotification) {
  const notiRepo = getManager().getRepository(Notification);
  const userRepo = getManager().getRepository(User);

  const noti = await notiRepo.create(incoming);

  if (actions && actions.length) {
    await Promise.all(actions.map((action) => ActionController.createAndConnect(action, noti)));
  }

  if (channelName) {
    const channel = await ChannelCotroller.find(channelName);
    noti.channel = channel;
    await notiRepo.save(noti);
    return noti;
  } else if (userIds) {
    const users = await Promise.all(userIds.map((userId) => userRepo.findOne({ userId })));
    noti.users = users;
    await notiRepo.save(noti);
    return noti;
  }

  return null;
}

export async function finish(noti: Notification) {
  const notiRepo = getManager().getRepository(Notification);
  noti.sent = true;
  notiRepo.save(noti);
}
