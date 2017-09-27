import uuid from 'uuid';
import slug from 'slug';
import { database } from '../../config';

const db = database();
const TABLE = 'products';

export default class Product {
  constructor(args) {
    this.id = args.id || uuid();
    this.name = args.name;
    this.slug = slug(args.name);
  }

  static getClients() {
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

  static createProduct(args) {
    db.read();

    const productDb = db.get(TABLE).find({ name: args.name }).value();
    if (productDb) {
      return { client: {}, messages: ['Product with this name exists'] };
    }
    let product = new Product({ ...args });
    const messages = product.validate();
    if (messages.length === 0) {
      product = product.toJSON();
      db.get(TABLE).push(product).write();
      return { product, messages };
    }
    return { product: {}, messages };
  }

  static changeProduct(id, args) {
    const productDb = Product.findById(id);
    if (productDb.value()) {
      const product = new Product({ ...args, id });
      const messages = product.validate();
      if (messages.length === 0) {
        return {
          client: productDb.assign({ ...product.toJSON() }).write(),
          messages,
        };
      }
      return { product: {}, messages };
    }
    return { product: {}, messages: ['No such product with this id'] };
  }

  static removeProduct(id) {
    const messages = [];
    const product = Product.findById(id).value();
    if (!product) {
      messages.push('No such product with this id');
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
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}
