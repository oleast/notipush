import ow from 'ow';
import { ICreateNotification } from '../entity/Notification';

const owNoti = {
  actions: ow.optional.array.ofType(ow.object.exactShape({
    action: ow.string,
    title: ow.string,
    icon: ow.optional.string,
  })),
  body: ow.string,
  channel: ow.optional.string,
  icon: ow.optional.string,
  image: ow.optional.string,
  renotify: ow.optional.boolean,
  requireInteraction: ow.optional.boolean,
  sendTime: ow.string.date,
  silent: ow.optional.boolean,
  tag: ow.optional.string,
  timestamp: ow.optional.string.date,
  title: ow.string,
  users: ow.optional.array.ofType(ow.number),
  url: ow.optional.string,
};

export const validateNotification = (noti: ICreateNotification) => {
  return ow(noti, ow.object.exactShape(owNoti));
};
