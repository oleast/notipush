import { Context } from 'koa';

import * as NotiController from '../controller/NotificationController';
import { scheduleNotification } from '../utils/push';
import { validateNotification } from '../validators/notification';

export async function createNotificaton(context: Context) {
  validateNotification(context.request.body);
  const noti = await NotiController.create(context.request.body);
  if (noti) {
    scheduleNotification(noti);
    context.body = noti;
  } else {
    context.status = 500;
    context.body = { message: 'Creation of notification failed' };
  }
}
