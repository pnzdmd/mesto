import './index.css';

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
function handlepreviewPicture(title, link) {
  popupImage.open({ name: title, link: link });
}

// Создание экземпляра карточки
function createCard(item) {
  const card = new Card(item, '#template-card', handlepreviewPicture);
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
  editFormValidation.removeErrorProfile();
  popupWithProfileForm.open();
});

// Слушатель кнопки добавления новой карточки
btnAddCard.addEventListener('click', () => {
  popupWithCardForm.open();
  addCardFormValidator.toggleButtonState();
});

// Отрисовка имеющихся карточек
cardList.renderItems();