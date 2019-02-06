import * as schedule from 'node-schedule';
import * as webPush from 'web-push';
import { SendResult } from 'web-push';

import { getAllSubscriptions } from '../controller/ChannelController';
import * as NotiController from '../controller/NotificationController';
import { Notification } from '../entity/Notification';
import { Subscription } from '../entity/Subscription';
import { VAPID_KEYS } from './vapid';

const { privateKey, publicKey, subject } = VAPID_KEYS;
webPush.setVapidDetails(subject, publicKey, privateKey);

// https://web-push-book.gauntface.com/demos/notification-examples/

export interface IPushAction {
  icon?: string;
  title: string;
  action: string;
}

export interface IPushNotification {
  /** Required for a good experience */
  title: string;
  body: string;
  icon: string;
  badge: string;
  vibrate: number[];

  /** Optional values */
  image?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  renotify?: boolean;
  silent?: boolean;
  actions?: IPushAction[];
  /** Unix timestamp */
  timestamp?: number;

  /** Not in use */
  // sound?: string;
  // dir: 'auto' | 'ltr' | 'rtl'
}

const sendNotification = async (sub: Subscription, noti: IPushNotification) => {
  const notiString = JSON.stringify(noti);
  const push = await webPush.sendNotification(
    {
      endpoint: sub.endpoint,
      keys: {
        auth: sub.auth,
        p256dh: sub.p256dh,
      },
    },
    notiString
  );
  return push;
};

export const triggerNotification = async (noti: Notification) => {
  const { sendTime, sent, channel, users, actions: dbActions, ...rest } = noti;
  const actions = dbActions.map(({ action, title, icon }) => ({ action, title, icon }));
  const pushNoti: IPushNotification = {
    ...rest,
    actions,
    timestamp: 1,
    vibrate: Notification.vibrate,
    badge: Notification.badge,
  };

  let pushResults: SendResult[] = [];
  if (channel) {
    const subs = await getAllSubscriptions(channel.name);
    const res = subs.map((sub) => sendNotification(sub, pushNoti));
    pushResults = await Promise.all(res);
  } else if (users) {
    const allSubs = users.reduce<Subscription[]>((subs, user) => [...user.subscriptions, ...subs], []);
    const res = allSubs.map((sub) => sendNotification(sub, pushNoti));
    pushResults = await Promise.all(res);
  }
  pushResults.forEach((res) => console.log(res));
  NotiController.finish(noti);
};

export const scheduleNotification = async (noti: Notification) => {
  const time = new Date(Date.parse(noti.sendTime));
  const trigger = () => triggerNotification(noti);
  const job = schedule.scheduleJob(noti.id.toString(), time, trigger);
};
