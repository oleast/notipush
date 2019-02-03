import { Context } from 'koa';

import * as NotiController from '../controller/NotificationController';

export async function createNotificaton(context: Context) {

  const noti = NotiController.create(context.body);
  if (noti) {
    context.body = noti;
  } else {
    context.status = 500;
    context.body = { message: 'Creation of notification failed' };
  }
}
