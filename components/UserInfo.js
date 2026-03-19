/**
 * esta clase es la responsabe de presentar la informacion del usuario
 * en la página 
 */
export default class UserInfo {
    constructor({ selectorName, selectorAbout,selectoravatar }) {
        
        this._nameUser = document.querySelector(selectorName);
        this._aboutUser = document.querySelector(selectorAbout);
        this._avatar = document.querySelector(selectoravatar);
    }

    /**
     * este metodo devuelve un objeto con la informacion sobre el usuario
     */
    getUserInfo() {
        return {
            name: this._nameUser.textContent,
            about: this._aboutUser.textContent
        };
    }

    /**
     * @param {} param0 
     * @param {'este el nombre del usaurio este debe de provenir de la api'} param0.name 
     * @param {*} param0.about 
     * toma los datos del nuevo usuario y los agrega en la pagina
     */
    setUserInfo({ name, about }) {
        this._nameUser.textContent = name;
        this._aboutUser.textContent = about;
        
    }

    /**
     * 
     * @param {'esta contien la imagen que se muesta como avatar del usuario'} avatar 
     */
    setUserAvatar(avatar){
        this._avatar.src = avatar;
    }
}