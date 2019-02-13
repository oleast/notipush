import { createChannel, getAllChannels } from './action/Channels';
import { createNotificaton } from './action/CreateNotification';
import { getStatus } from './action/Status';
import { postSubscription, postUbsubscribe } from './action/Subscribe';
import { getUserChannels, postUserChannels } from './action/UserChannels';

/**
 * All application routes.
 */
export const PublicRoutes = [
  {
    path: '/subscribe',
    method: 'post',
    action: postSubscription,
  },
  {
    path: '/unsubscribe',
    method: 'post',
    action: postUbsubscribe,
  },
  {
    path: '/user-channels',
    method: 'get',
    action: getUserChannels,
  },
  {
    path: '/user-channels',
    method: 'post',
    action: postUserChannels,
  },
  {
    path: '/channels',
    method: 'get',
    action: getAllChannels,
  },
];

export const PrivateRoutes = [
  {
    path: '/create-notification',
    method: 'post',
    action: createNotificaton,
  },
  {
    path: '/channels',
    method: 'post',
    action: createChannel,
  },
];

export const OpenRoutes = [
  {
    path: '/status',
    method: 'get',
    action: getStatus,
  },
];
