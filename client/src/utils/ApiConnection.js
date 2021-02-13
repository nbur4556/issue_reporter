import axios from 'axios';

class ApiConnection {
    constructor(url) {
        this.url = url;
    }

    buildQuery(options = {}) {
        return {
            url: (options.url || this.url) + options?.urlParams,
            body: options.body
        }
    }

    getQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.get(query.url);
    }

    postQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.post(query.url);
    }

    putQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.put(query.url);
    }

    deleteQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.delete(query.url);
    }
}

export default ApiConnection;