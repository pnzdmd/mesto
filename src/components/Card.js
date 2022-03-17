export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._title = data.title;
    this._link = data.link;
    this._template = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    const cardTemplate = document.querySelector(this._template).content;
    return cardTemplate.querySelector('.element').cloneNode(true);
  }

  _handleLikeicon = () => {
    this._likeButton.classList.toggle('element__like-btn_active');
  };

  _handleDeleteCard = () => {
    this._cardElement.remove();
  };

  

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeicon);
    this._deleteButton.addEventListener('click', this._handleDeleteCard);

    this._cardElement.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  _fillCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardElement.querySelector('.element__title').textContent = this._title;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    
    this._likeButton = this._cardElement.querySelector('.element__like-btn');
    this._deleteButton = this._cardElement.querySelector('.element__img_remove');
    this._cardImage = this._cardElement.querySelector('.element__img');
    
    this._fillCard();
    this._setEventListeners();
    
    return this._cardElement;
  }
}