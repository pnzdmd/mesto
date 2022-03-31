// Валидация
export const validationObj = {
  formSelector: '.popup__form', // форма попапов
  inputSelector: '.popup__input', // инпуты форм
  submitButtonSelector: '.popup__btn-save', // кнопка сохранить в форме
  inactiveButtonClass: 'popup__btn-save_card_invalid', // убираю кнопку сохранить при ошибке
  errorClass: 'popup__input_invalid', // подчеркивние инпута красным если есть ошибка
  inputErrorClass: '.error' // ошиюка в span
};


// Модальные окна
export const popupAddCard = '.popup_card';
export const popupEditProfile = '.popup_profile';
export const popupImage = '.popup_img';
export const popupConfirm = '.popup_type_confirmation';
export const popupAvatarSelector = '.popup_type_avatar';

// Формы
export const popupFormEdit = document.querySelector('.popup__form_profile');
export const popupFormAdd = document.querySelector('.popup__form_card');
export const popupFormConfirm = document.querySelector('.popup__form_delete-confirm');
export const popupFormAvatar = document.querySelector('.popup__form_avatar');

// Кнопки
export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const btnAddCard =  document.querySelector('.profile__btn-add');
export const btnProfileAvatar = document.querySelector('.profile__avatar-edit');

// Инпуты
export const popupName = document.querySelector('.popup__input_type_name');
export const popupDescription = document.querySelector('.popup__input_type_about');
export const popupNameImg = document.querySelector('.popup__input_type_card');
export const popupNameLink = document.querySelector('.popup__input_type_descr');


export const profileName = '.profile__name';
export const profileDescription = '.profile__about';
export const profileAvatar = '.profile__avatar';


// Контейнер
export const cardsContainer = document.querySelector('.elements__list');