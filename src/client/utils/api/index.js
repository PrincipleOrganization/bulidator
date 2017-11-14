import axios from 'axios';

import UsersApi from './users.api';
import ClientsApi from './clients.api';
import ProductsApi from './products.api';
import BundlesApi from './bundles.api';

axios.defaults.baseURL = 'http://localhost:5500/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export {
  UsersApi,
  ClientsApi,
  ProductsApi,
  BundlesApi
};
