import { Context } from 'koa';
import fetch from 'node-fetch';

import * as SubscriptionController from '../controller/SubscriptionController';
import * as UserController from '../controller/UserController';

const USER_DATA_ENDPOINT = 'https://online.ntnu.no/api/v1/profile/?format=json';

export async function postSubscription(context: Context) {
  const { authorization } = context.request.headers;
  const res = await fetch(USER_DATA_ENDPOINT, { headers: { authorization } });
  const { username, first_name, last_name } = await res.json();

  if (res.status === 403) {
    context.status = 403;
  } else {
    const user = await UserController.findOrCreate(username, `${first_name} ${last_name}`);
    const { endpoint } = context.request.body;
    const subscription = await SubscriptionController.findOrCreate(endpoint);
    await SubscriptionController.addToUser(user, subscription);
  }
  context.body = {};
}
