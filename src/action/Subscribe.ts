import * as SubscriptionController from '../controller/SubscriptionController';
import * as UserController from '../controller/UserController';
import { IUserContext } from '../middlewares';

export async function postSubscription(context: IUserContext) {
  const { username, first_name, last_name } = context.user;
  const user = await UserController.findOrCreate(username, `${first_name} ${last_name}`);
  const { endpoint } = context.request.body;
  const subscription = await SubscriptionController.findOrCreate(endpoint);
  await SubscriptionController.addToUser(user, subscription);

  context.body = {};
}
