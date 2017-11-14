import axios from 'axios';
import Auth from '../auth';

class BundlesApi {
  constructor() {
    this.path = '/bundle';
  }

  async fetchBundles() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async createBundle(payload) {
    const { data } = await axios.post(this.path, payload);
    return data;
  }
}

export default new BundlesApi();
