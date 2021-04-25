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

    updateAuthToken(request) {
        request.then(result => {
            console.log(result.headers);
        })
    }

    // API Calls
    getQuery(options = {}) {
        let query = this.buildQuery(options);
        const request = axios.get(query.url, { headers: this.getAuthHeader() });

        this.updateAuthToken(request);

        return request;
    }

    postQuery(options = {}) {
        let query = this.buildQuery(options);
        const request = axios.post(query.url, query.body, { headers: this.getAuthHeader() });

        this.updateAuthToken(request);

        return request;
    }

    putQuery(options = {}) {
        let query = this.buildQuery(options);
        const request = axios.put(query.url, query.body, { headers: this.getAuthHeader() });

        this.updateAuthToken(request);

        return request;
    }

    deleteQuery(options = {}) {
        let query = this.buildQuery(options);
        const request = axios.delete(query.url, {
            headers: this.getAuthHeader(),
            data: query.body
        });

        this.updateAuthToken(request);

        return request;
    }
}

export default ApiConnection;