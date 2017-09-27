/* eslint-disable no-console*/
import low from 'lowdb';
import fse from 'fs-extra';
import uuid from 'uuid';
import slug from 'slug';
import fileSync from 'lowdb/adapters/FileSync';
const isProd = process.env.NODE_ENV === 'production';
import constants from './constants';
import { crypt } from '../utils';

const user = {
  id: uuid(),
  name: constants.USER_NAME,
  password: crypt.encrypt(constants.USER_PASSWORD),
  role: 'admin',
  slug: slug(constants.USER_NAME),
};

fse.ensureFileSync(constants.DATA_FILE);
const db = low(new fileSync(constants.DATA_FILE));

db.defaults({
  users: [user],
  products: [],
  clients: [],
  bundles: []
}).write();

console.log('DB is running');

export default () => (db);
