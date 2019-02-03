import { createNotificaton } from './action/CreateNotification';
import { postSubscription } from './action/Subscribe';

/**
 * All application routes.
 */
export const UserRoutes = [
  {
    path: '/subscribe',
    method: 'post',
    action: postSubscription,
  },
  {
    path: '/channels',
    method: 'get',
    action: getUserChannels,
  },
  {
    path: '/channels',
    method: 'put',
    action: putUserChannels,
  },
];

export const BackendRoutes = [
  {
    path: '/schedule',
    method: 'post',
    action: createNotificaton,
  },
];
