export const validationObj = {
  formSelector: '.popup__form', // форма попапов
  inputSelector: '.popup__input', // инпуты форм
  submitButtonSelector: '.popup__btn-save', // кнопка сохранить в форме
  inactiveButtonClass: 'popup__btn-save_card_invalid', // убираю кнопку сохранить при ошибке
  errorClass: 'popup__input_invalid', // подчеркивние инпута красным если есть ошибка
  inputErrorClass: '.error' // ошиюка в span
};

export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupImg = document.querySelector('.popup_img');
export const modalImgItem = document.querySelector('.popup__image');
export const modalImgText = document.querySelector('.popup__image-title');
export const closeImgPopap = document.querySelector('.popup__btn-close_img');

export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const formElementProfile = document.querySelector('.popup__form');
export const nameInputProfile = document.querySelector('.popup__input_type_name');
export const jobInputProfile = document.querySelector('.popup__input_type_about');
export const btnAddCard = document.querySelector('.profile__btn-add');
export const cardsContainer = '.elements__list';
export const formPopupCard = document.querySelector('.popup__form_card');