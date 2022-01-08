let btnEdit = document.querySelector('.profile__btn-edit');
let btnSave = document.querySelector('.popup__btn-save');
let btnClose = document.querySelector('.popup__btn-close');

let profName = document.querySelector('.profile__name');
let profAbout = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');


// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
btnEdit.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = profName.textContent;
  jobInput.value = profAbout.textContent;
});
// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
btnClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

// изменение данных профиля
function formSubmitHandler (evt) {
  popup.classList.remove('popup_opened');
  profName.textContent = nameInput.value;
  profAbout.textContent = jobInput.value;
  evt.preventDefault();
};
formElement.addEventListener('submit', formSubmitHandler);