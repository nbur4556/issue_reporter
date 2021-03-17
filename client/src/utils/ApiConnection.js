import axios from 'axios';

class ApiConnection {
    constructor(url) {
        this.url = url;
    }

    setUrl(url) { this.url = url; }

    // Create query to send to backend API
    buildQuery(options = {}) {
        return {
            url: (options.urlExtension) ? (options.url || this.url) + options.urlExtension : (options.url || this.url),
            body: options.body,
            headers: { Authorization: `Bearer ${options.authorization}` }
        }
    }

    // API Calls
    getQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.get(query.url, { headers: query.headers });
    }

    postQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.post(query.url, query.body, { headers: query.headers });
    }

    putQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.put(query.url, query.body, { headers: query.headers });
    }

    deleteQuery(options = {}) {
        console.log(options)

        let query = this.buildQuery(options);
        return axios.delete(query.url, { headers: query.headers });
    }
}

export default ApiConnection;