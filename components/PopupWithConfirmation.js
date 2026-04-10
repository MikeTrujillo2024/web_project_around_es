import Popup from "./Popup.js";

/**
 * hereda de la clase popup para mostrar el popup de confirmación 
 * este recibe en su costructor
 * SELECTOR: Este contiene el nombre del pupop para mostrar
 * detail: Contiene la información de la card
 * submitCallback
 */

export default class PopupWithConfirmation extends Popup {
    constructor({ selector, detail,

    }) {
        super(selector);
        this._data = detail;
        this._btnConfirm = this._popup.querySelector(".popup__content-save-message");
        /* this._handleConfirmationSubmit = handleConfirmationSubmit; */

    }

    _confirmbtn() {
        this._btnConfirm.addEventListener("click", (e) => {
            e.preventDefault();
            const eventClikDelete = new CustomEvent(
                'deleteCustomEvent', {
                detail: {
                    cardId: this._data
                }
            }
            )
            document.dispatchEvent(eventClikDelete);
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this.open();
        this._confirmbtn()

    }


}