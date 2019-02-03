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
];
