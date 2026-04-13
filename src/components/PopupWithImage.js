import Popup from "./Popup.js";
/**
 * esta clase hereda de la  clase pupup para mostrar la imagen
 */
export default class PopupWithImage extends Popup{
    constructor(selectorImg){
        super(selectorImg);
        this._image = this._popup.querySelector(".popup__img");
        this._text = this._popup.querySelector(".popup__img-title");
    }

    /**
     * esta clase usa el metodo open de la clase padre y la modifica
     *
     */
    open(link,name){
        this._image.src = link;
        this._text.textContent = name;
        super.open();
    }
}