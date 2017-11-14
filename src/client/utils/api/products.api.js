import axios from 'axios';
import Auth from '../auth';

class ProductsApi {
  constructor() {
    this.path = '/product';
  }

  async fetchProducts() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async createProduct(payload) {
    const { data } = await axios.post(this.path, payload);
    return data;
  }
}

export default new ProductsApi();
