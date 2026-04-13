/**
 * esta clase controla todas las solicitudes que llegan por index
 */
export default class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    /**
     * 
     *verifica que la respuesta del api sea correcta si
     *no es ok manda el error
     */

    async _checkRes(res) {

        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    /**
     * 
     * muestra las cards cuando carga la página
     */
    async getInitialCards() {
        return await fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }

    /**
     * 
     * agrega una nueva card
     */
    async addCard(data) {
        return await fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.titulo,
                link: data.url
            })
        })
            .then(card => this._checkRes(card))
    }

    /**
     * 
     * carga la informacion del usuario tanto la imagen como el nombre y tipo usuario
     */
    async getUserInfo() {
        return await fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then(user => this._checkRes(user))
    }

    /**
     * 
     * @param {*} data "editamos tanto el nombre del usuario como el tipo de usaurio" 
     * @returns 
     */
    async editUserInfo(data) {
        return await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(user => this._checkRes(user))
    }

    /**
     * 
     * cambiamos el like 
     */
    async changeLikeStatus(cardId, cardLike) {
        const methodStatus = cardLike ? 'DELETE' : 'PUT';
        return await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: methodStatus,
            headers: this._headers
        })
            .then(likes => this._checkRes(likes));
    }

    /**
     * 
     * @param {*} cardId "id del card que sera eliminado"
     * @returns 
     */
    async deleteCard(cardId) {
        return await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(cardelete => this._checkRes(cardelete))
    }

    /**
     * 
     */

    async updateAvatar(avatar) {
        return await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar.url__avatar
            })
        })
            .then(imgAvatar => this._checkRes(imgAvatar))
    }
}
