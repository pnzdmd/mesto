import Card from "./Card.js";

export default class PrivateCard extends Card {
  constructor(data, cardSelector, handleCardClick, handleCardRemove, handleToggleLike) {
    super(data, cardSelector, handleCardClick, handleToggleLike);
    this._handleCardRemove = handleCardRemove;
  }

  handleRemoveCard() { // удаление карточки
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    super._setEventListeners();
    
    // Слушатель кнопки удаления карточки
    this._cardElement.querySelector('.element__img_remove').addEventListener('click', () => {
      this._handleCardRemove(this._cardId, this);
    });
    
  }
}