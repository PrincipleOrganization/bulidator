import uuid from 'uuid';
import slug from 'slug';
import { database } from '../../config';

const db = database();
const TABLE = 'bundles';

export default class Bundle {
  constructor(args) {
    this.id = args.id || uuid();
    this.name = args.name;
    this.product = args.product;
    this.client = args.client;
    this.secret = args.secret;
    this.slug = slug(args.name);
  }

  static getBundles() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static findByName(name) {
    db.read();
    return db.get(TABLE).find({ name });
  }

  static createBundle(args) {
    db.read();

    const bundleDb = db.get(TABLE).find({ name: args.name }).value();
    if (bundleDb) {
      return { bundle: {}, messages: ['Bundle with this name exists'] };
    }
    let bundle = new Bundle({ ...args });
    const messages = bundle.validate();
    if (messages.length === 0) {
      bundle = bundle.toJSON();
      db.get(TABLE).push(bundle).write();
      return { bundle, messages };
    }
    return { bundle: {}, messages };
  }

  static changeBundle(id, args) {
    const bundleDb = Bundle.findById(id);
    if (bundleDb.value()) {
      const bundle = new Bundle({ ...args, id });
      const messages = bundle.validate();
      if (messages.length === 0) {
        return {
          bundle: bundleDb.assign({ ...bundle.toJSON() }).write(),
          messages,
        };
      }
      return { bundle: {}, messages };
    }
    return { bundle: {}, messages: ['No such bundle with this id'] };
  }

  static removeBundle(id) {
    const messages = [];
    const bundle = Bundle.findById(id).value();
    if (!bundle) {
      messages.push('No such bundle with this id');
    }
    return {
      secusses: db.get(TABLE).remove({ id }).write().length === 1,
      messages,
    };
  }

  validate() {
    const messages = [];
    if (!this.name) {
      messages.push('Name is required!');
    }
    if (!this.product) {
      messages.push('Product is required!');
    }
    if (!this.client) {
      messages.push('Client is required!');
    }
    if (!this.secret) {
      messages.push('Secret is required!');
    }
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}
