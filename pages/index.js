import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/popupwithform.js";
import Api from "../components/Api.js";
import {
  initialCards,
  settingsValidator,
  getinfo,
  addimg,
  formElements
} from "../src/utils.js";

/**
 * conectamos con el servidor meidante una la sig pagina y con la authorizacion
 */
const api = new Api("https://around-api.es.tripleten-services.com/v1",
  { authorization: "ccd6733f-8fc2-4817-8533-321a6421c44d", "Content-Type": "application/json", });

/**
* inicializamos user info
*/
const user = new UserInfo({ selectorName: ".profile__name", selectorAbout: ".profile__about",selectoravatar: ".profile__image" });



/**
 * usamos la informacion del api para llenar los datos del usuario y mostrarlos en la página
 */
api.getUserInfo()
  .then((usr) => {
    user.setUserInfo({name: usr.name,about: usr.about});
    user.setUserAvatar(usr.avatar);
  })
  .catch((err) => console.log(`error en el usuario: ${err}`))


  
  /**
 * mostramos los card desde un principio
 */
api.getInitialCards().then((cards) => {
  const cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const cardItem = new Card(item, "#card-template", handleCardClick);
        cardList.addItem(cardItem.getCreateCard());
      }
    }, "#place");
  cardList.renderer();
})
  .catch((err) => {
    console.log(`Hay un error : ${err}`);
  })


/***
 * hacemos que se muestra los popup de imagenes
 */
const popupImage = new PopupWithImage("#popup-image");
popupImage.setEventListeners();

const handleCardClick = (link, name) => {
  popupImage.open(link, name)
}










/**
 * inicializamos popupwith form para editar el formularios
 */
const profilePopup = new PopupWithForm({
  selector: "#popup-profile",
  submitCallback: (formData) => {
    user.setUserInfo({
      name: formData.name__user,
      about: formData.about
    });
    profilePopup.close();
  }
});

profilePopup.setEventListeners();

/**
 * abrir modal de edit user info
 */
getinfo.addEventListener("click", () => {
  const { name, about } = user.getUserInfo();

  document.querySelector("#input__popup_name_Editar").value = name;
  document.querySelector("#input_popup_about").value = about;

  profilePopup.open()
});

/**
 * abrir el modal para agregar una nueva imagen
 */

const addNewImage = new PopupWithForm({
  selector: "#popup-places",
  submitCallback: (formData) => {
    const newCard = new Card(
      {
        name: formData.titulo,
        link: formData.url
      },
      "#card-template",
      handleCardClick

    );
    cardList.addItem(newCard.getCreateCard());
    addNewImage.close();
  }
});

addNewImage.setEventListeners();

addimg.addEventListener("click", () => {
  addNewImage.open();
})


formElements.forEach((formElement) => {
  const formvalid = new FormValidator(settingsValidator, formElement);
  formvalid.enableValidation();
})