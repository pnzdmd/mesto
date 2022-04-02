import './index.css';

import {
  validationObj,
  token,
  cohort38,
  profileName,
  profileDescription,
  profileAvatar,
  popupFormEdit,
  popupFormAdd,
  popupFormAvatar,  
  popupConfirm,
  popupEditProfile, 
  popupAvatarSelector, 
  popupAddCard,  
  popupImg, 
  btnEditProfile, 
  btnAddCard, 
  btnProfileAvatar, 
  cardsContainer
} from '../utils/constans.js';

import Api from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({
  baseUrl: cohort38,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});


// Валидация формы профиля
const editFormValidation = new FormValidator(validationObj, popupFormEdit);
editFormValidation.enableValidation();
//Валидация формы карточки
const addCardFormValidator = new FormValidator(validationObj, popupFormAdd);
addCardFormValidator.enableValidation();
//Валидация формы аватара
const avatarFormValidation = new FormValidator(validationObj, popupFormAvatar);
avatarFormValidation.enableValidation();


let userId;

const profileInfo = new UserInfo(profileName, profileDescription, profileAvatar);
const popupImage = new PopupWithForm(popupConfirm, {submitForm: () => {}});
const imgPopup = new PopupWithImage(popupImg);

const popupWithProfileForm = new PopupWithForm(popupEditProfile, {
  submitForm: (data) => {
    popupWithProfileForm.displayLoadingStatus(true);
    api.editProfile(data.firstname, data.description)
    .then(() => {
      profileInfo.setUserInfo(data.firstname, data.description);
      popupWithProfileForm.close();
    })
    .catch((err) =>{console.log(`Ошибка: ${err}`)})
    .finally(() =>{popupWithProfileForm.displayLoadingStatus(false)});
  }
});

const popupAvatar = new PopupWithForm(popupAvatarSelector, {
  submitForm: (data) => {
    popupAvatar.displayLoadingStatus(true);
    api.updateAvatar(data['link-avatar'])
    .then(() => {
      profileInfo.setUserAvatar(data['link-avatar']);
      popupAvatar.close();
    })
    .catch((err) =>{console.log(`Ошибка: ${err}`)})
    .finally(() =>{popupAvatar.displayLoadingStatus(false)})
  }
});

const addCard = new PopupWithForm(popupAddCard, {
  submitForm: (data) => {
    addCard.displayLoadingStatus(true);

    api.addCard(data['name-img'], data['link-img'])
    .then(res => {
      const newCardInfo = {
        link: res.link,
        name: res.name,
        likes: res.likes,
        _id: res._id,
        userId: res._id,
        ownerId: res.owner._id
      };

      createСard(newCardInfo);
      addCard.close();
    })
    .catch((err) =>{console.log(`Ошибка: ${err}`)})
    .finally(() =>{addCard.displayLoadingStatus(false)});
  }
});


btnEditProfile.addEventListener("click", function() {
  popupWithProfileForm.open();
  const profileDescription = profileInfo.getUserInfo();
  firstname.value = profileDescription.name;
  description.value = profileDescription.description;
  editFormValidation.toggleButtonState();
  editFormValidation.removeErrors();
});

btnProfileAvatar.addEventListener("click", () => {
  popupAvatar.open();
  avatarFormValidation.toggleButtonState();
  avatarFormValidation.removeErrors();
});

btnAddCard.addEventListener("click", () => {
  addCard.open();
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.removeErrors();
});


function createСard (cardElement){
  const card = new Card (cardElement.name, cardElement.link, cardElement.likes, cardElement._id, userId, cardElement.ownerId, '#template-card-owner',
  {
    cardClick: (name, link) => {
      imgPopup.open(name, link);
    },
    delClick: (id) => {
      popupImage.changeSubmitHandler((evt) => {
        evt.preventDefault();
        api.removeCard(id)
          .then(res => {
            card.delImage()
            popupImage.close()
          })
          .catch((err) =>{console.log(`Ошибка: ${err}`)})
      });
      popupImage.open()
    },
    likeClick: (id) => {
      if(card.isLiked()){
        api.removeLike(id)
        .then(res => {
          card.setLike(res.likes);
        })
        .catch((err) =>{console.log(`Ошибка: ${err}`)})
      }
      else {
        api.addLike(id)
        .then(res => {
          card.setLike(res.likes);
        })
        .catch((err) =>{console.log(`Ошибка: ${err}`)});
      }
    }
  });
  
  const cardItem = card.createCard();

  cardList.prependItem(cardItem);
}


const cardList = new Section({
  renderer: (item) => { createСard ({name: item.name, link: item.link, likes: item.likes, _id: item._id,
    userId: userId, ownerId: item.owner._id}) }
  },
  cardsContainer
);

Promise.all([api.getInitialCards(), api.getProfile()])
  .then(([cards, userInfo]) => {
    profileInfo.setUserInfo(userInfo.name, userInfo.about);
    profileInfo.setUserAvatar(userInfo.avatar);
    
    userId = userInfo._id;
  cards.reverse();
  cardList.renderItems(cards);
  })
  .catch((err) =>{console.log(`Ошибка: ${err}`)});