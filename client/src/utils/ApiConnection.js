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

    updateAuthToken(response) {
        response.then(result => {
            if (result.headers?.authentication) {
                localStorage.setItem('authToken', result.headers.authentication);
            }
        });
    }

    // API Calls
    getQuery(options = {}) {
        let query = this.buildQuery(options);
        const response = axios.get(query.url, { headers: this.getAuthHeader() });
        this.updateAuthToken(response);
        return response;
    }

    postQuery(options = {}) {
        let query = this.buildQuery(options);
        const response = axios.post(query.url, query.body, { headers: this.getAuthHeader() });
        this.updateAuthToken(response);
        return response;
    }

    putQuery(options = {}) {
        let query = this.buildQuery(options);
        const response = axios.put(query.url, query.body, { headers: this.getAuthHeader() });
        this.updateAuthToken(response);
        return response;
    }

    deleteQuery(options = {}) {
        let query = this.buildQuery(options);
        const response = axios.delete(query.url, {
            headers: this.getAuthHeader(),
            data: query.body
        });
        this.updateAuthToken(response);
        return response;
    }
}

export default ApiConnection;