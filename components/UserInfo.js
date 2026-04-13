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
     * esta funcion va a convertir la primera letra en mayuscula las demas letras las convertira en minusculas
     * si la funcion tiene datos vacios este regresara algo vacio
     */
    _UcFirst(str){
         if (!str) return str
        return str[0].toUpperCase()+str.slice(1).toLowerCase()
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
        this._nameUser.textContent = this._UcFirst(name);
        this._aboutUser.textContent = this._UcFirst(about);
        
    }

    /**
     * 
     * @param {'esta contien la imagen que se muesta como avatar del usuario'} avatar 
     */
    setUserAvatar(avatar){
        this._avatar.src = avatar;
    }
}