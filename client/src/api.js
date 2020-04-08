class Api {
    static base_url = 'http://localhost:3000'

    static headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    static get(url) {
        return fetch(this.base_url+url)
        .then(response => response.json())
    }

    static post(url, body) {
        return fetch(this.base_url+url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(response=>response.json())
    }

    static delete(url, body) {
        return fetch(this.base_url+url, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(body)
        })
    }

    




}