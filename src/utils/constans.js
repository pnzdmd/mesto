// Валидация
export const validationObj = {
  formSelector: '.popup__form', // форма попапов
  inputSelector: '.popup__input', // инпуты форм
  submitButtonSelector: '.popup__btn-save', // кнопка сохранить в форме
  inactiveButtonClass: 'popup__btn-save_card_invalid', // убираю кнопку сохранить при ошибке
  errorClass: 'popup__input_invalid', // подчеркивние инпута красным если есть ошибка
  inputErrorClass: '.error' // ошиюка в span
};


//Данные Api
export const cohort38 = 'https://mesto.nomoreparties.co/v1/cohort-38';
export const token = '0fe6e8d3-db28-4506-b622-fef597981f88';


// Расположение карточек
export const cardsContainer = '.elements__list';


// Кнопки редактирования
const profile = document.querySelector('.profile');
export const btnEditProfile = profile.querySelector('.profile__btn-edit');
export const btnAddCard = profile.querySelector('.profile__btn-add');
export const profileAvatar = profile.querySelector('.profile__avatar-container');


// Редактирование профиля
const popupProfile = document.querySelector('.popup_profile');
const popupProfileContainer = popupProfile.querySelector('.popup__container');
export const formElementProfile = popupProfileContainer.querySelector('.popup__form');
export const nameInputProfile = popupProfileContainer.querySelector('.popup__input_type_name');
export const jobInputProfile = popupProfileContainer.querySelector('.popup__input_type_about');


// Добавление карточек
const popupCards = document.querySelector('.popup_card');
const popupCardsContainer = popupCards.querySelector('.popup__container');
export const formElementCards = popupCardsContainer.querySelector('.popup__form');



// Аватарка
const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupAvatarForm = popupAvatar.querySelector('.popup__container');