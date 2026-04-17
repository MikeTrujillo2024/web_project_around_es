import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/popupwithform.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import {
  btn_popup__save,
  settingsValidator,
  getinfo,
  addimg,
  formElements,
  aceptPopup,
  avatar,
  btnSubmitAvatar,
  btn_submit_image
} from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";
let cardList;
/**
 * conectamos con el servidor meidante una la sig pagina y con la authorizacion
 */
const api = new Api("https://around-api.es.tripleten-services.com/v1",
  { authorization: "ccd6733f-8fc2-4817-8533-321a6421c44d", "Content-Type": "application/json", });

/**
* inicializamos user info
*/
const user = new UserInfo({ selectorName: ".profile__name", selectorAbout: ".profile__about", selectoravatar: ".profile__image" });



/**
 * usamos la informacion del api para llenar los datos del usuario y mostrarlos en la página
 */
api.getUserInfo()
  .then((usr) => {
    user.setUserInfo({ name: usr.name, about: usr.about });
    user.setUserAvatar(usr.avatar);
  })
  .catch((err) => console.log(`error en el usuario: ${err}`))


/**
 * inicializamos popupwith form para editar el formularios
 */
const profilePopup = new PopupWithForm({
  selector: "#popup-profile",
  submitCallback: (formData) => {
    btn_popup__save.textContent = "ACTUALIZANDO..."
    api.editUserInfo({ name: formData.name__user, about: formData.about })
      .then(() => {
        user.setUserInfo({
          name: formData.name__user,
          about: formData.about
        });
        setTimeout(() => {
          btn_popup__save.textContent = "Guardar";
          profilePopup.close()
        }, 2000)
      })
      .catch((err) => {
        btn_popup__save.textContent = `${err}`;
        setTimeout(() => {
          btn_popup__save.textContent = "Guardar";
          profilePopup.close()
        }, 2000)
      })
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
 * hacemos el cambio de la imagen del avatar
 */
const profileAvatar = new PopupWithForm({
  selector: "#popup-profile-avatar",
  submitCallback: (formData) => {
    btnSubmitAvatar.textContent = "Guardando..."
    api.updateAvatar(formData)
      .then((data) => {
        setTimeout(() => {
          user.setUserAvatar(data.avatar)
          profileAvatar.close();
        }, 2000)
      })
      .catch(errAvatar => { console.log(`hay un error: ${errAvatar}`) })
      .finally(() => {
        btnSubmitAvatar.textContent = "Guardar";
      })

  }
})

profileAvatar.setEventListeners();

avatar.addEventListener("click", () => {
  profileAvatar.open()
});



/**
* mostramos los card desde un principio
*/
api.getInitialCards().then((cards) => {
  cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const cardItem = new Card(item, "#card-template", handleCardClick);
        cardList.addItem(cardItem.getCreateCard());

      }

    }, "#place");

  //enviamos el listenes del like
  document.addEventListener('likeCardBtn', (e) => {
    const { cardId, cardLike, cardClassList } = e.detail;
    api.changeLikeStatus(cardId, cardLike)
      .then(() => {
        if (cardLike) {
          cardClassList.remove("place_card_content_like--active");
        } else {
          cardClassList.add("place_card_content_like--active");
        }
      })
      .catch((errLike) => {
        console.log(`Hay un error aqui: ${errLike}`);
      })

  });
  cardList.renderer();
})
  .catch((err) => {
    console.log(`Hay un error : ${err}`);
    cardList.remove();
  })

//enviamos el evento delete 
document.addEventListener('deleteCardBtn', (e) => {
  const detail = e.detail.cardId;
  const elment = e.detail.element;

  const popupconfirmation = new PopupWithConfirmation({
    selector: "#popup-confirmation",
    detail: detail,
    btnSubmit: aceptPopup
  });

  popupconfirmation.setEventListeners();
  document.addEventListener('deleteCustomEvent', (e) => {
    api.deleteCard(e.detail.cardId)
      .then(() => {
        console.log("eliminada la carta");
        popupconfirmation.close();
        elment.remove()
      })
      .catch((err) => { `error : ${err}` })
  })
  /* popupconfirmation.showData(detail); */
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
 * abrir el modal para agregar una nueva imagen
 */

const addNewImage = new PopupWithForm({
  selector: "#popup-places",
  submitCallback: (formData) => {
    btn_submit_image.textContent = "Agregando..."
    api.addCard(formData)
      .then((data) => {
        setTimeout(() => {
          const newCard = new Card(
            data,
            "#card-template",
            handleCardClick

          );
          cardList.addItem(newCard.getCreateCard());
          addNewImage.close();


        }, 2000)

      }).catch((err) => {
        console.log(`Hay un error: ${err}`)
      })
      .finally(() => {
        btn_submit_image.textContent = "Guardar"
      })
  }

});

addNewImage.setEventListeners();

addimg.addEventListener("click", () => {
  addNewImage.open();
})


formElements.forEach((formElement) => {
  const formvalid = new FormValidator(settingsValidator, formElement);
  formvalid.enableValidation();
});