import axios from 'axios';

class ApiConnection {
    constructor(url) {
        this.url = url;
    }

    setUrl(url) { this.url = url; }

    // Get and apply authorization token as a header from local storage
    getAuthHeader() {
        const authToken = localStorage.getItem('authToken');
        return (authToken) ? { Authorization: `Bearer ${authToken}` } : null;
    }

    // Create query to send to backend API
    buildQuery(options = {}) {
        return {
            url: (options.urlExtension) ? (options.url || this.url) + options.urlExtension : (options.url || this.url),
            body: options.body
        }
    }

    // API Calls
    getQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.get(query.url, { headers: this.getAuthHeader() });
    }

    postQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.post(query.url, query.body, { headers: this.getAuthHeader() });
    }

    putQuery(options = {}) {
        let query = this.buildQuery(options);
        console.log(query);

        return axios.put(query.url, query.body, { headers: this.getAuthHeader() });
    }

    deleteQuery(options = {}) {
        let query = this.buildQuery(options);
        return axios.delete(query.url, {
            headers: this.getAuthHeader(),
            data: query.body
        });
    }
}

export default ApiConnection;