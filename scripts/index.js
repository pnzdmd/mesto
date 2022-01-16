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


let btnEdit = document.querySelector('.profile__btn-edit');
let btnSave = document.querySelector('.popup__btn-save');
let btnClose = document.querySelector('.popup__btn-close');

let profName = document.querySelector('.profile__name');
let profAbout = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');

let btnAdd = document.querySelector('.profile__btn-add');
let btnCloseCard = document.querySelector('.popup__btn-close_card');
let btnSaveCard = document.querySelector('.popup__btn-save_card');
let popupCard = document.querySelector('.popup_card');
let elementCard = document.querySelector('.popup__form_card')
const btnLike = document.querySelectorAll('.element__like-btn');
const elemList = document.querySelector('.elements__list');
const cardsContainer = document.querySelector('.elements__list');

let nameCard = document.querySelector('.popup__input_type__card');
let descrCard = document.querySelector('.popup__input_type_descr');

const popupImg = document.querySelector('.popup__img'); 
const modalImgItem = document.querySelector('popup__image'); 
const modalImgText = document.querySelector('popup__image-title'); 
const cardElement = document.querySelector('.element');
const closeImgPopap = document.querySelector('.popup__btn-close_img');
const img = document.querySelector('.element__img');



// открытие модального окна профиля
btnEdit.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = profName.textContent;
  jobInput.value = profAbout.textContent;
});
// закрытие модального окна профиля
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



// 5 ПРОЕКТ



// открытие модального окна карточки
btnAdd.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupCard.classList.add('popup_opened');
});

// закрытие модального окна карточки
btnCloseCard.addEventListener('click', () => {
  popupCard.classList.remove('popup_opened');
});


//функция лайков
function likeActiv(e) {
  if(e.target.classList.contains('element__like-btn')) {
    console.log('лайк');
    e.target.classList.toggle('element__like-btn_active');
  }
};
// слушатель события лайка
cardsContainer.addEventListener('click', likeActiv);


// удаление карточки
elemList.addEventListener("click", function (event) {
  if (event.target.classList.contains("element__img_remove")) {
    event.target.parentElement.remove();
  }
});


//форма добавление карточки
function formElementCard (evt) {
  evt.preventDefault();
  popupCard.classList.remove('popup_opened'); 
  cardsContainer.prepend(createCard(descrCard.value, nameCard.value))
  evt.target.reset();// ИЗУЧИТЬ!!!
};
elementCard.addEventListener('submit', formElementCard);

// функция добавления карточки через форму(template)
function createCard(nameCard, descrCard) {
  const cardTemplate = document.querySelector('#template-card').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__title').textContent = descrCard;
  card.querySelector('.element__img').alt = descrCard;
  card.querySelector('.element__img').src = nameCard;
  
  cardsContainer.prepend(card);
  return card;
};

// открытие попапа с изображением
function imgOpenPopup (e) {
  if(e.target.classList.contains('element__img')) {
    popupImg.classList.add('popup_opened');
    console.log('1');
  }
};
// слушатель события открытия попапа с изображением
cardsContainer.addEventListener('click', imgOpenPopup);


//закрытие попапа с изображением
closeImgPopap.addEventListener('click', () => {
  popupImg.classList.remove('popup_opened');
});


///////////////////////////////////////








/* function imgOpenPopup(elem) {
  elem.addEventListener('click', (e) => {
    if (e.target === elem.querySelector('.element')) {
      console.log('1');
      popupImg.classList.add('popup_opened')
      modalImgItem.src = `${e.target.src}`;
      modalImgItem.alt = `${e.target.alt}`;
      modalImgText.textContent = `${e.target.alt}`;
    }
  })
} */


//обработка масива ?????
// function renderCards() {
//   initialCards.forEach((elem) => {
//     insertCardContainer.append(createCard(elem.name, elem.link))
//   })
// }