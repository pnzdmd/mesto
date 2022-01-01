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
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profName.textContent;
  jobInput.value = profAbout.textContent;
}
// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
function closePopup() {
  popup.classList.remove('popup_opened');
}

btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);

// изменение данных профиля

function formSubmitHandler (evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profAbout.textContent = jobInput.value;
  btnSave.addEventListener('click', closePopup);
};
formElement.addEventListener('submit', formSubmitHandler);