/**
 * esta clase esta encargada de abrir y cerrar las ventanas emergentes
 */
export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        //bind. siempre sea la clase seleccionada 
        this._handleEscClose = this._handleEscClose.bind(this);

    }

    close() {
        this._popup.classList.remove("mOpen");
        this._popup.classList.add("popup_opened");

    }
    open() {
        this._popup.classList.remove("popup_opened");
        this._popup.classList.add("mOpen");
        document.addEventListener("keydown", this._handleEscClose); // cierra cuando se presiona x cerrar

    }

    /**
     * almacena la logica para cerra el popup cuando se presiona la tecla "ESC"
     */
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    /**
     * agrega un detectoer de eventos clic al icono para cerrar el popup
     */
    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup__button-cancel") ||
                evt.target.classList.contains("mOpen")) {
                this.close();
            }

        })
    }


}