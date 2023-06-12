import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/password', passwordRouter);
routes.use('/products', productsRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
