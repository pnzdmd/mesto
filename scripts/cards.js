





const popupImg = document.querySelector('.popup_img');
const modalImgItem = document.querySelector('.popup__image');
const modalImgText = document.querySelector('.popup__image-title');
const closeImgPopap = document.querySelector('.popup__btn-close_img');

/* class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;

    

    //return cardElement;
    }
  // добавляет шаблон разметки
  _getTemplate() {
    const cardElement = document.querySelector('#template-card').content.querySelector('.element').cloneNode(true);

    this.photo = this._cardElement.querySelector('element__img');
    this._like = this._cardElement.querySelector('element__like-btn');
    this._delete = this._cardElement.querySelector('element__img_remove');
    this.title = this._cardElement.querySelector('element__title');

    return cardElement;
  }

  _handleOpenPopup() {
    modalImgItem.src = this._link;
    modalImgItem.alt = this._name;
    modalImgText.textContent = this._name;
    popupImg.classList.add('popup_opened');
  }
  _handleClosePopup() {
    //modalImgItem.src = '';
    popupImg.classList.remove('popup_opened');
  }

  _handleLikeButton() {
    this._element.target.classList.toggle('element__like-btn_active');
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
       this._handleOpenPopup();
    });
  
    closeImgPopap.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }
  //наполнение карточек
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').alt = this._name;
    
    return this._element;
  }
}





initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();

  document.querySelector('.elements__list').append(cardElement);
}); */
