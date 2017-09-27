import users from './users/routes';
import clients from './clients/routes';
import products from './products/routes';
import bundles from './bundles/routes';

export default (app) => {
  app.use('/api/v1/user', users);
  app.use('/api/v1/client', clients);
  app.use('/api/v1/product', products);
  app.use('/api/v1/bundle', bundles);
};
