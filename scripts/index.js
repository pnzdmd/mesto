import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { openPopup, closePopup } from './utils.js';
import { validationObj, initialCards, popupImg } from './constans.js';

// изменение профиля
const btnEditProfile = document.querySelector('.profile__btn-edit');
const btnCloseProfile = document.querySelector('.popup__btn-close');
const popupProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElementProfile = document.querySelector('.popup__form');
const nameInputProfile = document.querySelector('.popup__input_type_name');
const jobInputProfile = document.querySelector('.popup__input_type_about');

// изменение карточки
const cardTemplateSelector = '#template-card';
const btnAddCard = document.querySelector('.profile__btn-add');
const btnCloseCard = document.querySelector('.popup__btn-close_card');
const popupCard = document.querySelector('.popup_card');
const cardsContainer = document.querySelector('.elements__list');
const formPopupCard = document.querySelector('.popup__form_card');
const profileNameInput = document.querySelector('.popup__input_type_card');
const profileDescriptionInput = document.querySelector('.popup__input_type_descr');

const editFormValidation = new FormValidator(validationObj, formElementProfile);
const addCardFormValidator = new FormValidator(validationObj, formPopupCard);
editFormValidation.enableValidation();
addCardFormValidator.enableValidation();

btnEditProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileAbout.textContent;
  editFormValidation.toggleButtonState();
  editFormValidation.removeErrorProfile();
});

btnCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

// изменение данных профиля
function handleFormProfile (evt) {
  closePopup(popupProfile);
  profileName.textContent = nameInputProfile.value;
  profileAbout.textContent = jobInputProfile.value;
  evt.preventDefault();
}
formElementProfile.addEventListener('submit', handleFormProfile);

// открытие модального окна карточки
btnAddCard.addEventListener('click', () => {
  openPopup(popupCard);
});

// закрытие модального окна карточки
btnCloseCard.addEventListener('click', () => {
  closePopup(popupCard);
});

//функция добавления карточки
function addNewCard() {
  const newCard = {
    name: profileNameInput.value,
    link: profileDescriptionInput.value
  };
  const cardNewElement = renderCard(newCard);
  cardsContainer.prepend(cardNewElement);
}

// функция открытия попапа карточки
function handleFormCard (evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addNewCard();
  profileNameInput.value = '';
  profileDescriptionInput.value = '';
  addCardFormValidator.toggleButtonState();
}
formPopupCard.addEventListener('submit', handleFormCard);

function  renderCard(data) {
  const card = new Card(data, cardTemplateSelector);
  const cardElement = card.renderNewCard();
  return cardElement;
}

function handleNewCards() {
  initialCards.forEach((data) => {
    const cardElement = renderCard(data);
    cardsContainer.prepend(cardElement);
  });
}
handleNewCards();