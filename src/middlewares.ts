import { Context } from 'koa';
import fetch from 'node-fetch';

import { BACKEND_PASS } from './constants/environment';

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

export const allowCors = async (context: Context, next: any) => {
  context.set('Access-Control-Allow-Origin', '*');
  context.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  context.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
};

export const authenticateUser = async (context: Context, next: any) => {
  const { authorization } = context.request.headers;
  const res = await fetch(USER_DATA_ENDPOINT, { headers: { authorization } });

  if (res.status === 403) {
    context.status = 403;
    context.body = { message: 'Authentication failed' };
  } else {
    const user = (await res.json()) as IOnlineUser;
    context.user = user;
    return next();
  }
};

export const authenticateBackend = async (context: Context, next: any) => {
  // Planning on implementing something more robust.
  // Thinking about public/private key signing, but it is for the future.

  const authorization: string = context.request.headers.authorization;
  const pass = authorization.replace('Bearer ', '');
  if (pass === BACKEND_PASS) {
    return next();
  } else {
    context.status = 403;
    context.body = { message: 'Authentication failed' };
  }
};
