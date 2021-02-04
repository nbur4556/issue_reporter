import axios from 'axios';

class Api {
    constructor(url) {
        this.url = url;
    }

    get() {
        return axios.get('/api/test');
    }
}

export default Api;