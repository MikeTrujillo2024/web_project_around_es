/**
 * Toma los datos de la tarjeta (tanto el texto como un enlace a la imagen) y un
 * selector de elemento de plantilla como parámetros en el constructor.
 */
export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likebtn = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

  }

  /**
   * este elmento privado permite tomar el elmento templete
   * para clonar este elemento n veces que sea necesarop
   * */
  _getTemplate() {
    const cardElemnt = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place__card")
      .cloneNode(true);

    return cardElemnt;
  }

  /**
   * metodo like
   * cada vez que se presiona el boton de me gusta (corazon)
   * este metodo hace que cambie de color
   */
  _like() {
    this._element
      .querySelector(".place__card_content_like")
      .addEventListener("click", (e) => {
        const eventoclickLike = new CustomEvent(
          'likeCardBtn', {
          detail: {
            cardId: this._id,
            cardLike: this._likebtn,
            cardClassList: e.target.classList
          }
        });
        document.dispatchEvent(eventoclickLike);
      });
  }

  /**
   * Metodo Trash
   * este metodo sive para eliminar el objeto del metodo array
   */
  _trash() {
    this._element
      .querySelector(".place__card_trash")
      .addEventListener("click", (e) => {
        const eventoclickDelete = new CustomEvent(
          'deleteCardBtn', {
          detail: {
            cardId: this._id,
            element: this._element
          }
        }
        )
        /*  this._element.remove(); */
        document.dispatchEvent(eventoclickDelete);
      });
  }

  /**
   * metodod imgPopup
   * Este metodo sirve para mostra el popup al hacer click en la imagen
   */
  _imgPopup() {

    this._element
      .querySelector(".place__card_image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._title);
      });
  }

  /**
   * este metodo justa los metodos privado
   */
  _setListener() {
    this._like();
    this._trash();
    this._imgPopup();
  }

  /**
   * 
   * esta clase hace que se pinten los like si es que este viene true
   */
  _showLikeBtn(likeBolean) {
    if (likeBolean) {
      this._element.querySelector(".place__card_content_like").classList.add("place_card_content_like--active")
    }
  }

  /**
   * aqui es donde creamos los card
   * hasta este momento esta construido cada elemenmto pero no esta visible en el dom
   */
  getCreateCard() {
    this._element = this._getTemplate();
    this._showLikeBtn(this._likebtn);
    this._setListener();

    this._element.querySelector(".place__card_image").src = this._link;
    this._element.querySelector(".place__card_image").alt = this._title;
    this._element.querySelector(".place__card_content_text").textContent = this._title;

    return this._element;
  }



}



