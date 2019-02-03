import { getManager } from 'typeorm';

import { Notification } from '../entity/Notification';
import { ICreateAction, NotificationAction } from '../entity/NotificationAction';

export async function createAndConnect(incoming: ICreateAction, noti: Notification) {
  const actionRepo = getManager().getRepository(NotificationAction);

  const action = await actionRepo.create(incoming);
  action.notification = noti;
  actionRepo.save(action);
}
