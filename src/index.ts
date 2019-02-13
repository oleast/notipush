import 'reflect-metadata';

import * as cors from '@koa/cors';
import * as Sentry from '@sentry/node';
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import { createConnection } from 'typeorm';

import { DB_CONNECTION } from './constants/database';
import { HOST, PORT, SENTRY_DSN } from './constants/environment';
import { authenticateBackend, authenticateUser } from './middlewares';
import { OpenRoutes, PrivateRoutes, PublicRoutes } from './routes';
import { setup } from './setup';

Sentry.init({ dsn: SENTRY_DSN });

createConnection(DB_CONNECTION)
  .then(async (conncetion) => {
    const app = new Koa();
    const router = new Router();

    app.on('error', (err) => Sentry.captureException(err));

    router.use('/public', authenticateUser);
    PublicRoutes.forEach((route) => router[route.method]('/public' + route.path, route.action));

    router.use('/private', authenticateBackend);
    PrivateRoutes.forEach((route) => router[route.method]('/private' + route.path, route.action));

    OpenRoutes.forEach((route) => router[route.method]('/open' + route.path, route.action));

    app.use(cors({ origin: '*' }));
    app.use(koaBody());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(PORT, HOST);

    await setup();

    console.log(`Notipush server running at ${HOST}:${PORT}`);
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
