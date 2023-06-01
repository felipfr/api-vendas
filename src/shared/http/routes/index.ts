import passwordRouter from '@modules/users/routes/password.routes';
import productsRouter from '@modules/products/routes/products.routes';
import sessionsRouter from '@modules/users/routes/session.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/password', passwordRouter);
routes.use('/products', productsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
