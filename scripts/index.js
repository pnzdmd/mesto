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
const popupProfile = document.querySelector('.popup__profile');
const profName = document.querySelector('.profile__name');
const profAbout = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');


// изменение карточки
const cardTemplate = document.querySelector('#template-card');
const btnAdd = document.querySelector('.profile__btn-add');
const btnCloseCard = document.querySelector('.popup__btn-close_card');
const popupCard = document.querySelector('.popup__card');
const cardsContainer = document.querySelector('.elements__list');
const formPopupCard = document.querySelector('.popup__form_card');
const nameCard = document.querySelector('.popup__input_type__card');
const descrCard = document.querySelector('.popup__input_type_descr');


const popupImg = document.querySelector('.popup__img');
const modalImgItem = document.querySelector('.popup__image');
const modalImgText = document.querySelector('.popup__image-title');
const closeImgPopap = document.querySelector('.popup__btn-close_img');



// функция открытия модального окна профиля
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия модального окна профиля
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

btnEditProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profName.textContent;
  jobInput.value = profAbout.textContent;
})

btnCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
})

// изменение данных профиля
function formSubmitHandler (evt) {
  closePopup(popupProfile);
  profName.textContent = nameInput.value;
  profAbout.textContent = jobInput.value;
  evt.preventDefault();
};
formElement.addEventListener('submit', formSubmitHandler);


////////           5 ПРОЕКТ                ///////


// открытие модального окна карточки
btnAdd.addEventListener('click', () => {
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
    name: nameCard.value,
    link: descrCard.value
  }
  renderCard(newCard);
}
// функция открытия попапа карточки
function formElementCard (evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addNewCard();
  nameCard.value = '';
  descrCard.value = '';
};
formPopupCard.addEventListener('submit', formElementCard);


function  renderCard(element) {
  const cardNewElement = renderNewCard(element);
  cardsContainer.prepend(cardNewElement);
}

function newCards() {
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

newCards();