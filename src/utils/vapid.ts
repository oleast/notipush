import * as fs from 'fs';
import * as path from 'path';
import * as webPush from 'web-push';
import { VapidKeys } from 'web-push';

import { VAPID_EMAIL } from '../constants/environment';

export interface IVapidCredentials extends VapidKeys {
  subject: string;
}

const VAPID_FILE = '../../keys/vapid.json';
const absVapidPath = path.resolve(__dirname, VAPID_FILE);
const vapidKeysString = fs.readFileSync(absVapidPath).toString();
let vapidKeys: IVapidCredentials = JSON.parse(vapidKeysString);

if (!vapidKeysString) {
  if (!VAPID_EMAIL) {
    throw new Error(`VAPID credentials not found in ${absVapidPath}, you have to set env NOTIPUSH_VAPID_EMAIL`);
  }
  const newVapidkeys = webPush.generateVAPIDKeys();
  fs.writeFileSync(VAPID_FILE, newVapidkeys);
  vapidKeys = {
    ...newVapidkeys,
    subject: `mailto:${VAPID_EMAIL}`,
  };
}

export const VAPID_KEYS = vapidKeys;
