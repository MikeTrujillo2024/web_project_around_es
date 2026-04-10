import Popup from "./Popup.js";
/* import { popupProfile } from "./utils.js"; */

export default class PopupWithForm extends Popup {
    constructor({ selector, submitCallback }) {
        super(selector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector(".popup__container");
        //obtenemos los datos de todos los inputs que registe en el formulario
        this._formInputs = Array.from(this._form.querySelectorAll(".popup__input"));


    }

    /**
     * metodo privado que recopila datos de todos los campos de entrada
     */
    _getInputValues() {
        const formValues = {};
        this._formInputs.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    /**
     * este metodo debe agregar al formulario un controlador de eventos suibmit
     * y el detector de eventos click 
     */

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues())
            /* console.log(this._getInputValues()); */
        })
    }

    /**
     * debe de modificar el metodo padere para reiniciarl el formulario una vez se cierre el popup
     */

    close() {
        super.close();
        this._form.reset()
    }

}