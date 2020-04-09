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

    static delete(url) {
        return fetch(this.base_url+url, {
            method: 'DELETE',
            headers: this.headers
        })
    }

    static patch(url, body) {
        return fetch(this.base_url+url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(response=>response.json())

    }
}

class Formatter {
    static capitalize(str) {
      return `${str[0].toUpperCase()}${str.slice(1)}`
    }
  
    static sanitize(str) {
      return str.replace(/[^A-Za-z0-9-' ]+/g, '')
    }
  
    static titleize(str) {
      const exceptions = ['the', 'a', 'an', 'but', 'of', 'and', 'for', 'at', 'by', 'from', 'to']
      str = this.capitalize(str)
      let strArray = str.split(' ')
      const title = []
      for (let i=0; i<strArray.length; i++) {
        if (exceptions.includes(strArray[i])) {
          title.push(strArray[i])
        } else {
          title.push(this.capitalize(strArray[i]))
        }
      }
      return title.join(' ')
    }
  }
  