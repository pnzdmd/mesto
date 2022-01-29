const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



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
const cardTemplate = document.querySelector('#template-card');
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



// функция открытия модального окна профиля
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEventListenerPopup(popup)
}

// функция закрытия модального окна профиля
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEventListenerPopup(popup)
}

btnEditProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileAbout.textContent;
  removeError(formElementProfile);
})

btnCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
})

// изменение данных профиля
function handleFormProfile (evt) {
  closePopup(popupProfile);
  profileName.textContent = nameInputProfile.value;
  profileAbout.textContent = jobInputProfile.value;
  evt.preventDefault();
};
formElementProfile.addEventListener('submit', handleFormProfile);


////////           5 ПРОЕКТ                ///////


// открытие модального окна карточки
btnAddCard.addEventListener('click', () => {
  openPopup(popupCard)
})

// закрытие модального окна карточки
btnCloseCard.addEventListener('click', () => {
  closePopup(popupCard);
})

//функция создания карточки
function renderNewCard(element) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__img');
  const cardTitle = cardElement.querySelector('.element__title');
  cardTitle.textContent = element.name;
  cardElementImage.alt = element.name;
  cardElementImage.src = element.link;

  setCards(cardElement);
  return cardElement;
}

//функция добавления карточки
function addNewCard() {
  const newCard = {
    name: profileNameInput.value,
    link: profileDescriptionInput.value
  }
  renderCard(newCard);
}

// функция открытия попапа карточки
function handleFormCard (evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addNewCard();
  profileNameInput.value = '';
  profileDescriptionInput.value = '';
  disableButton(formPopupCard);
};
formPopupCard.addEventListener('submit', handleFormCard);


function  renderCard(element) {
  const cardNewElement = renderNewCard(element);
  cardsContainer.prepend(cardNewElement);
}

function handleNewCards() {
  initialCards.forEach((element) => {
    renderCard(element);
  });
}

function setCards(element) {
  element.querySelector('.element__like-btn').addEventListener('click', handleLikeButton);
  element.querySelector('.element__img_remove').addEventListener('click', handleDeleteButton);
  element.querySelector('.element__img').addEventListener('click', openPopupImg);
}

// функция лайков карточек
function handleLikeButton(event) {
  event.target.classList.toggle('element__like-btn_active');
}
// функция удаления карточек
function handleDeleteButton(event) {
  event.target.closest('.element').remove();
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
})

handleNewCards();

/////////////////////////            6 проект             ///////////////////////////////////

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
    closePopup(openPoput)
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

// функция активации/деактивации кнопки созранения карточки
function disableButton(formCard) {
  const saveButton = formCard.querySelector('.popup__btn-save');
  saveButton.classList.add('popup__btn-save_card_invalid');
  saveButton.disabled = true;
}