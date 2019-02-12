import { PushSubscription } from 'web-push';

import * as SubscriptionController from '../controller/SubscriptionController';
import * as UserController from '../controller/UserController';
import { IUserContext } from '../middlewares';

export async function postSubscription(context: IUserContext) {
  const { username, first_name, last_name } = context.user;
  const user = await UserController.findOrCreate(username, `${first_name} ${last_name}`);
  const sub: PushSubscription = context.request.body;
  const subscription = await SubscriptionController.findOrCreate(sub);
  await SubscriptionController.addToUser(user, subscription);

  context.body = {};
}

export async function postUbsubscribe(context: IUserContext) {
  const sub: PushSubscription = context.request.body;
  await SubscriptionController.removeFromUser(sub);
  context.body = {};
}
