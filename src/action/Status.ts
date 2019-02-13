import { Context } from 'koa';

export async function getStatus(context: Context) {
  context.status = 200;
  context.body = { status: 'Running' };
}
