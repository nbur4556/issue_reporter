class Api {
    constructor(url) {
        this.url = url;
    }

    get() {
        fetch(this.url)
            .then(response => response.json())
            .then(data => console.log(data));
    }
}

export default Api;