class Api {
    constructor(url) {
        this.url = url;
    }
}

// Testing

const newApi = new Api('https://www.google.com');

console.log(newApi.url);