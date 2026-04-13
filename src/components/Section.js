/**
 * la clase Section para presentar una lista de elemento de una pagina
 * item: funciona como un array de datos, que se debe de añadir cuando se inicializa laclase
 * renderer: responsable de crear y renderizar los datos
 * selector: es el selector css
 */
export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items; // array de datos lo que se muestra en la pagina
        this._renderer = renderer;
        this._selector = document.querySelector(selector);


    }

    /**
     * metodo public para mostrar los elementos iniciales 
     */
    renderer() {

        this._items.forEach((element) => {
            this._renderer(element);
        });
    }

    /**
     * metodo publico para agregar los elmentios al dom
     * 
     */

    addItem(elment) {
        this._selector.prepend(elment);

    }
}