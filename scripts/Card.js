import { modalImgItem, modalImgText, popupImg } from "./constans.js";
import { openPopup } from "./utils.js";

export class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = cardTemplateSelector;
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

  _handlepreviewPicture = () => {
    modalImgItem.src = this._link;
    modalImgItem.alt = this._name;
    modalImgText.textContent = this._name;
    openPopup(popupImg);
  };


  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeicon);
    this._deleteButton.addEventListener('click', this._handleDeleteCard);

    this._cardImage.addEventListener('click', this._handlepreviewPicture);
  }

  _fillCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.element__title').textContent = this._name;
  }

  renderNewCard() {
    this._cardElement = this._getTemplate();
    
    this._likeButton = this._cardElement.querySelector('.element__like-btn');
    this._deleteButton = this._cardElement.querySelector('.element__img_remove');
    this._cardImage = this._cardElement.querySelector('.element__img');
    
    this._fillCard();
    this._setEventListeners();
    
    return this._cardElement;
  }
}