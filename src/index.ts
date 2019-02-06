import 'reflect-metadata';

import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import { createConnection } from 'typeorm';

import { HOST, PORT } from './constants/environment';
import { authenticateBackend, authenticateUser } from './middlewares';
import { PrivateRoutes, PublicRoutes } from './routes';
import { setup } from './setup';

createConnection()
  .then(async (connection) => {
    const app = new Koa();
    const router = new Router();

    router.use('/public', authenticateUser);
    PublicRoutes.forEach((route) => router[route.method]('/public' + route.path, route.action));

    router.use('/private', authenticateBackend);
    PrivateRoutes.forEach((route) => router[route.method]('/private' + route.path, route.action));

    app.use(cors());
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(PORT, HOST);

    await setup();

    console.log(`Notipush server running at ${HOST}:${PORT}`);
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
