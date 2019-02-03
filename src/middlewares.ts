import { Context } from 'koa';
import fetch from 'node-fetch';

const USER_DATA_ENDPOINT = 'https://online.ntnu.no/api/v1/profile/?format=json';

export interface IOnlineUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface IUserContext extends Context {
  user: IOnlineUser;
}

export const authenticateUser = async (context: Context, next: any) => {
  const { authorization } = context.request.headers;
  console.log('Auth header', authorization);
  const res = await fetch(USER_DATA_ENDPOINT, { headers: { authorization } });

  if (res.status === 403) {
    context.status = 403;
    context.body = { message: 'Authentication failed' };
  } else {
    const user = (await res.json()) as IOnlineUser;
    console.log('User: ', user.username);
    context.user = user;
    return next();
  }
};
