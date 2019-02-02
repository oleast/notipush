import { postSubscription } from './action/Subscribe';

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: '/subscribe',
    method: 'post',
    action: postSubscription,
  },
];
