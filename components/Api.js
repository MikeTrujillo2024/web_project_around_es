/**
 * esta clase controla todas las solicitudes que llegan por index
 */
export default class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: json.stringify({
                name: data.name,
                link: data.link
            })
        })
    }


    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then(user => this._checkRes(user))
    }

    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(user => this._checkRes(user))
    }
}
