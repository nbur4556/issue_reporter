import axios from 'axios';

class ApiConnection {
    constructor(url) {
        this.url = url;
    }

    get() {
        return axios.get('/api/test');
    }

    post() {
        return axios.post('/api/test');
    }

    put() {
        return axios.put('/api/test');
    }

    delete() {
        return axios.delete('/api/test');
    }
}

export default ApiConnection;