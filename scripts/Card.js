export class Card {
  constructor(data, cardTemplateSelector, openPopupImg) {
    this._name = data.name;
    this._link = data.link;
    this._openPopupImg = openPopupImg;
    this._template = document.querySelector(cardTemplateSelector)
    .content.querySelector('.element');
  }

  // метод активации лайка
  _handleLikeicon = () => {
    this._likeButton.classList.toggle('element__like-btn_active');
  }

  //метод удаления карточки
  _handleDeleteCard = () => {
    this._cardElement.remove();
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeicon);
    this._deleteButton.addEventListener('click', this._handleDeleteCard);
    this._cardImage.addEventListener('click', this._openPopupImg);
  }

  _fillCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.element__title').textContent = this._name;
  }

  renderNewCard() {
    this._cardElement = this._template.cloneNode(true);

    //нахожу
    this._likeButton = this._cardElement.querySelector('.element__like-btn');
    this._deleteButton = this._cardElement.querySelector('.element__img_remove');
    this._cardImage = this._cardElement.querySelector('.element__img');
    
    this._fillCard();
    this._setEventListeners();
    
    return this._cardElement;
  }
}