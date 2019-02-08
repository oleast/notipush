import * as ChannelController from './controller/ChannelController';
import * as NotiController from './controller/NotificationController';
import { ICreateChannel } from './entity/Channel';
import { scheduleNotification } from './utils/push';

const CHANNELS: ICreateChannel[] = [
  { name: 'articles', description: 'Nye artikler' },
  { name: 'offlines', description: 'Nye utgaver av Offline' },
  { name: 'attendance_bedpres', description: 'Påmeldingsstart for bedriftspresentasjoner' },
  { name: 'attendance_course', description: 'Påmeldingsstart for kurs' },
  { name: 'attendance_social', description: 'Påmeldingsstart for sosiale arrangementer' },
  { name: 'alerts', description: 'Ting som skjer i linjeforeningen' },
];

async function setupChannels() {
  await Promise.all(CHANNELS.map(async (channel) => await ChannelController.findOrCreate(channel)));
}

async function rehydrateSchedule() {
  const notis = await NotiController.getUnfinished();
  notis.forEach((noti) => scheduleNotification(noti));
}

export async function setup() {
  await setupChannels();
  await rehydrateSchedule();
}
