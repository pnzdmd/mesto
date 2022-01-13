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
}
formElement.addEventListener('submit', formSubmitHandler);



// 5 ПРОЕКТ

let btnAdd = document.querySelector('.profile__btn-add');
let btnCloseCard = document.querySelector('.popup__btn-close_card');
let popupCard = document.querySelector('.popup_card');
let popupFormCard = document.querySelector('.popup__form_card')
const btnLike = document.querySelectorAll('.element__like-btn');


// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
btnAdd.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupCard.classList.add('popup_opened');
});

btnCloseCard.addEventListener('click', () => {
  popupCard.classList.remove('popup_opened');
})

//ЛАЙКИ
btnLike.forEach(function(like) {
  like.addEventListener('click', function() {
    let likeActive = like;
    likeActive.classList.toggle('element__like-btn_active')
  })
})



//////////////////////////////////////////////////////////////

//обработка масива
function cards() {
  initialCards.forEach((elem) => {
    cardConteiner.append(createCard(elem.name, elem.link))
  })
}

let removeCard = document.querySelectorAll('.element__img_remove')
let CardElement = document.querySelector('.element')
let elemList = document.querySelectorAll('.elements__list')

removeCard.addEventListener('click', deleteCard);

function deleteCard(evt) {
  if (evt.target.classList.contains('element__img_remove')) {
    evt.target.elemList.remove('element')
  }
}

