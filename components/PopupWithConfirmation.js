import Popup from "./Popup.js";

/**
 * hereda de la clase popup para mostrar el popup de confirmación 
 * este recibe en su costructor
 * SELECTOR: Este contiene el nombre del pupop para mostrar
 * DATA: Contiene la información de la card
 * HANDLECONFIRMATIONSUBMIT
 */

export default class PopupWithConfirmation extends Popup {
    constructor({ selector, detail }) {
        super(selector);
        this._data = detail;
        /* this._handleConfirmationSubmit = handleConfirmationSubmit; */

    }

    setEventListeners() {
        super.setEventListeners();
        console.log(this._popup)
    }
}