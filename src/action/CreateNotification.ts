import { Context } from 'koa';

import * as NotiController from '../controller/NotificationController';
import { scheduleNotification } from '../utils/push';

export async function createNotificaton(context: Context) {
  const noti = await NotiController.create(context.body);
  if (noti) {
    scheduleNotification(noti);
    context.body = noti;
  } else {
    context.status = 500;
    context.body = { message: 'Creation of notification failed' };
  }
}
