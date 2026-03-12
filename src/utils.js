const initialCards = [
  /* {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  }, */
];

/**
 * este objeto contiene las principales
 * selectores que usa para las validaciones
 */
const settingsValidator = {
  formSelector: ".popup__container",
  formSet: ".popup__content",
  inputSelector: ".popup__input",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: ".popup__input_type_error",
  InputErrorActive: "form__input-error_active",
  errorClass: ".popup__error_visible",
  typeSubmit: "submit",
  typeInput: "input",
  formbuttonSubmit: ".popup__content-save",
};


const getinfo = document.querySelector(".profile__info_edit_button"); //boton que selecciona el boton de editar user
const addimg = document.querySelector(".profile__info-button-add"); //boton que selecciona el boton de editar user
export { initialCards, settingsValidator, getinfo, addimg }
