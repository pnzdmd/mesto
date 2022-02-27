import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from './initialCards.js';

// изменение профиля
const btnEditProfile = document.querySelector('.profile__btn-edit');
const btnCloseProfile = document.querySelector('.popup__btn-close');
const popupProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElementProfile = document.querySelector('.popup__form');
const nameInputProfile = document.querySelector('.popup__input_type_name');
const jobInputProfile = document.querySelector('.popup__input_type_about');
const popupBtnSave = document.querySelector('.popup__btn-save');

// изменение карточки
const cardTemplateSelector = '#template-card';
const btnAddCard = document.querySelector('.profile__btn-add');
const btnCloseCard = document.querySelector('.popup__btn-close_card');
const popupCard = document.querySelector('.popup_card');
const cardsContainer = document.querySelector('.elements__list');
const formPopupCard = document.querySelector('.popup__form_card');
const profileNameInput = document.querySelector('.popup__input_type_card');
const profileDescriptionInput = document.querySelector('.popup__input_type_descr');

// попап с увелечением изображений
const popupImg = document.querySelector('.popup_img');
const modalImgItem = document.querySelector('.popup__image');
const modalImgText = document.querySelector('.popup__image-title');
const closeImgPopap = document.querySelector('.popup__btn-close_img');


const validationObj = {
  formSelector: '.popup__form', // форма попапов
  inputSelector: '.popup__input', // инпуты форм
  submitButtonSelector: '.popup__btn-save', // кнопка сохранить в форме
  inactiveButtonClass: 'popup__btn-save_card_invalid', // убираю кнопку сохранить при ошибке
  errorClass: 'popup__input_invalid', // подчеркивние инпута красным если есть ошибка
  inputErrorClass: '.error' // ошиюка в span
};

const editFormValidation = new FormValidator(validationObj, formElementProfile);
const addCardFormValidator = new FormValidator(validationObj, formPopupCard);
editFormValidation.enableValidation();
addCardFormValidator.enableValidation();


// функция открытия модального окна профиля
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEventListenerPopup(popup);
}

// функция закрытия модального окна профиля
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEventListenerPopup(popup);
}

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


////////           5 ПРОЕКТ                ///////


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
function handleFormCard () {
  closePopup(popupCard);
  addNewCard();
  profileNameInput.value = '';
  profileDescriptionInput.value = '';
  addCardFormValidator.toggleButtonState();
}
formPopupCard.addEventListener('submit', handleFormCard);


function  renderCard(data) {
  const card = new Card(data, cardTemplateSelector, openPopupImg); //нужно тчо бы передавался либо name либо link
  const cardElement = card.renderNewCard();
  return cardElement;
}

function handleNewCards() {
  initialCards.forEach((data) => {
    const cardElement = renderCard(data);
    cardsContainer.prepend(cardElement);
  });
}

// функция открытия попапа с изображениями
function openPopupImg(event) {
  modalImgItem.src = event.target.src;
  modalImgItem.alt = event.target.alt;
  modalImgText.textContent = event.target.alt;
  openPopup(popupImg);
}
// функция закрытия попапа с изображениями
closeImgPopap.addEventListener('click', ()=> {
  closePopup(popupImg);
});

handleNewCards();

/////////////////////////     6 проект             ///////////////////////////////////

////функция закрытия по ESC
function closeByEsc(evt) {
  if(evt.key === 'Escape') {
    const esc = document.querySelector('.popup_opened');
    closePopup(esc);
  }
}
////функция закрытия по клику оверлей
function clickOverlay(evt) {
  const openPoput = evt.target;
  if(evt.target === evt.currentTarget) {
    closePopup(openPoput);
  }
}

function addEventListenerPopup(popup) {
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('click', clickOverlay);
}

function removeEventListenerPopup(popup) {
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('click', clickOverlay);
}












// функция активации/деактивации кнопки сохранения карточки
// без нее пустые карточки добавляются
/* function disableButton(formCard) {
  const buttonSave = formCard.querySelector('.popup__btn-save');
  buttonSave.classList.add('popup__btn-save_card_invalid');
  buttonSave.disabled = true;
}

function enableSubmitButton(popupBtnSave) {
  popupBtnSave.classList.remove('popup__btn-save_card_invalid');
  popupBtnSave.disabled = false;
 }


// функция обнуления ошибок при открытии/закрытии попапа
 function removeError(formElement) {
  const remRedLine = Array.from(formElement.querySelectorAll('.popup__input'));
   remRedLine.forEach(redLine => {
     redLine.classList.remove('popup__input_invalid');
   });
   const removeSpan = Array.from(formElement.querySelectorAll('.error'));
   removeSpan.forEach(span => {
     span.textContent = "";
   });
 } */