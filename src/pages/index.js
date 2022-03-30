import './index.css';

import { 
  validationObj,
  cardsContainer,
  btnEditProfile,
  btnAddCard,
  profileAvatar,
  formElementProfile,
  formElementCards,
  nameInputProfile,
  jobInputProfile,
  popupAvatarForm,
  cohort38,
  token
} from '../utils/constans.js';

import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PrivateCard from '../components/PrivateCard.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupError from '../components/PopupError.js';
import Api from '../components/Api.js';


// Валидация формы профиля
const editFormValidation = new FormValidator(validationObj, formElementProfile);
editFormValidation.enableValidation();
//Валидация формы карточки
const addCardFormValidator = new FormValidator(validationObj, formElementCards);
addCardFormValidator.enableValidation();
//Валидация формы аватара
const  avatarFormValidation = new FormValidator(validationObj, popupAvatarForm);
avatarFormValidation.enableValidation();


// userId
let userId;


// Создание класса UserInfo
const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar' });


// Создание класса PopupWithImage
const popupImage = new PopupWithImage('.popup_img');


// Создание модального окна с ошибкой
const popupWithError = new PopupError('.popup-error');


// Создание класса Section 
const cardList = new Section({
  renderer: (item) => {
    const addedCard = createCard(item);
    cardList.addItem(addedCard);
  }
},
  cardsContainer
);


// Создание класса API
const api = new Api({
  baseUrl: cohort38,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});


// Отображение ошибки при запросе у сервера
function showError(code) {
  popupWithError.open(code);
}


// Открытие попапа с изображением
function handlePreviewPicture(title, link) {
  popupImage.open({ name: title, link: link });
}


// Открытия попапа с удалением карточки
function removeCard(cardId, card) {
  popupWithConfirmationForm.open(cardId, card);
}

// Изменение статуса лайка
function toggleLike(card, cardId, isLiked) {
  if (isLiked) {
    api.removeLike(cardId)
      .then(res => {
        card.toggleLike(false);
        card.countLikes(res.likes);
      })
      .catch(err => showError(err));
  } else {
    api.addLike(cardId)
      .then(res => {
        card.toggleLike(true);
        card.countLikes(res.likes);
      })
      .catch(err => showError(err));
  }
}


// Редактирование профиля
const popupWithProfileForm = new PopupWithForm(
  {
    selector: '.popup_profile',
    handleFormSubmit: (data) => {
      popupWithProfileForm.displayLoadingStatus(true);
      api.updateUserProfile(data.title, data.subtitle)
        .then(res => {
          updateUserProfile(res);
          popupWithProfileForm.close();
        })
        .catch(err => showError(err))
        .finally(() => popupWithProfileForm.displayLoadingStatus(false));
    }
  }
);


// Добавление карточки
const popupWithCardForm = new PopupWithForm(
  {
    selector: '.popup_card',
    handleFormSubmit: (data) => {
      popupWithCardForm.displayLoadingStatus(true);
      api.addNewCard(data.title, data.link)
        .then(res => {
          const newCard = createCard(res);
          cardList.addItem(newCard);
          popupWithCardForm.close();
        })
        .catch(err => showError(err))
        .finally(() => popupWithCardForm.displayLoadingStatus(false));
    }
  }
);


// Редактирование аватара
const popupWithAvatar = new PopupWithForm(
  {
    selector: '.popup_type_avatar',
    handleFormSubmit: (data) => {
      // Отображаем статус запроса
      popupWithAvatar.displayLoadingStatus(true);
      api.updateAvatar(data.link)
        .then(res => {
          updateUserAvatar(res);
          popupWithAvatar.close();
        })
        .catch(err => showError(err))
        .finally(() => popupWithAvatar.displayLoadingStatus(false));
    }
  }
);


// Подтверждение удаления карточки
const popupWithConfirmationForm = new PopupWithConfirmation(
  {
    selector: '.popup_type_confirmation',
    handleFormSubmit: (id, card) => {
      api.removeCard(id)
        .then(() => {
          card.handleRemoveCard();
          popupWithConfirmationForm.close();
        })
        .catch(err => showError(err));
    }
  }
);


// Заполнение профиля имеющимися данными
function fillProfilePopup(userInfo) {
  nameInputProfile.value = userInfo.title;
  jobInputProfile.value = userInfo.subtitle;
}


// Обновление информации о профиле
function updateUserProfile(data) {
  userInfo.setUserInfo(data);
}


// Обновление аватара
function updateUserAvatar(data) {
  userInfo.setUserAvatar(data);
}



// Создание карточки
function createCard(item) {
  // проверка состояния лайка
  const isLiked = (item.likes.find(element => element._id === userId))
    ? true
    : false;

  // создаём карточки, исходя из владельца карточки
  const card = (item.owner._id === userId)
    ? new PrivateCard(item, '#template-card-owner', handlePreviewPicture, removeCard, toggleLike)
    : new Card(item, '#template-card-viewer', handlePreviewPicture, toggleLike);

  const addedCard = card.generateCard();
  card.toggleLike(isLiked);
  return addedCard;
}


// Наполнение страницы данными
function fillPage() {
  Promise.all([
    api.getCurrentUser(),
    api.getInitialCards()
  ])
    .then(([userData, existingCards]) => {
      updateUserProfile(userData);
      updateUserAvatar(userData);
      userId = userData._id;
      cardList.renderItems(existingCards.reverse())
    })
    .catch(err => showError(err));
}





// Добавление слушателя просмотра карточки
popupImage.setEventListeners();

// Добавление слушателя редактирования профиля
popupWithProfileForm.setEventListeners();


// Добавление слушателя окна добавления карточки
popupWithCardForm.setEventListeners();


// Добавление слушателя обновления аватара
popupWithAvatar.setEventListeners();


// Добавление слушателя подтверждения удаления карточки
popupWithConfirmationForm.setEventListeners();


// Слушатель кнопки редактирования профиля
btnEditProfile.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  fillProfilePopup(currentUserInfo);
  editFormValidation.toggleButtonState();
  editFormValidation.removeErrors();
  popupWithProfileForm.open();
});


// Слушатель кнопки добавления карточки
btnAddCard.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  popupWithCardForm.open();
});


// Слушатель кнопки редактирования автара
profileAvatar.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  popupWithAvatar.open();
});

fillPage();






















/* import './index.css';

import { 
  validationObj, 
  initialCards, 
  popupImg, 
  btnEditProfile, 
  formElementProfile, 
  nameInputProfile, 
  jobInputProfile, 
  btnAddCard, 
  cardsContainer, 
  formPopupCard 
} from '../utils/constans.js';

import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


const editFormValidation = new FormValidator(validationObj, formElementProfile);
const addCardFormValidator = new FormValidator(validationObj, formPopupCard);
editFormValidation.enableValidation();
addCardFormValidator.enableValidation();

// Класс userInfo
const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about' });


// Создание экземлпяра класса PopupWithImage
const popupImage = new PopupWithImage('.popup_img');

// Открытие попапа с изображением
function handlePreviewPicture(title, link) {
  popupImage.open({ name: title, link: link });
}

// Создание экземпляра карточки
function createCard(item) {
  const card = new Card(item, '#template-card', handlePreviewPicture);
  const addedCard = card.generateCard();
  return addedCard;
}

// Наполнение страницы имеющимися карточками
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const addedCard = createCard(item);
    cardList.addItem(addedCard);
  }
},
cardsContainer
);

// Модальное окно добавления карточки
const popupWithCardForm = new PopupWithForm(
  {
    selector: '.popup_card',
    handleFormSubmit: (data) => {
      const newCard = createCard(data);
      cardList.addItem(newCard);
    }
  }
);

// модальное окно профиля
const popupWithProfileForm = new PopupWithForm({
  selector: '.popup_profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});


function fillProfilePopup(userInfo) {
  nameInputProfile.value = userInfo.title;
  jobInputProfile.value = userInfo.subtitle;
}

// Добавление слушателя для модального окна просмотра карточки
popupImage.setEventListeners();
// Добавление слушателя для модального окна редактирования профиля
popupWithProfileForm.setEventListeners();
// Добавление слушателя для модального окна добавления карточки
popupWithCardForm.setEventListeners();

// Слушатель кнопки редактирования профиля
btnEditProfile.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  fillProfilePopup(currentUserInfo);
  editFormValidation.toggleButtonState();
  editFormValidation.removeErrors();
  popupWithProfileForm.open();
});

// Слушатель кнопки добавления новой карточки
btnAddCard.addEventListener('click', () => {
  popupWithCardForm.open();
  addCardFormValidator.toggleButtonState();
});

// Отрисовка имеющихся карточек
cardList.renderItems(); */