import * as UserController from '../controller/UserController';
import { IUserContext } from '../middlewares';

export async function postUserChannels(context: IUserContext) {
  const { username } = context.user;
  const { channels: channelNames } = context.request.body;
  const channels = await UserController.setChannels(username, channelNames);
  context.body = channels;
}

export async function getUserChannels(context: IUserContext) {
  const { username } = context.user;
  const channels = await UserController.getChannels(username);
  context.body = channels;
}
