export default class Card {
    constructor(data, cardSelector, renderOpenPopupImg) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._image = data.link;
        this._renderOpenPopupImg = renderOpenPopupImg;
        this._card = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true)
        this.photo = this._card.querySelector('.elements__photo')
        this.like = this._card.querySelector('.elements__like')
        this.delete = this._card.querySelector('.elements__delete')
        this.title = this._card.querySelector('.elements__title')
    }
    createCard() {
        this._element = this._card;
        this.photo.src = this._image;
        this.photo.alt = this._name;
        this.title.textContent = this._name;
        this._setCardListeners();
        return this._element;
    }
    _setCardListeners() {
        this.like
            .addEventListener('click', this._handleCardLike);
        this.delete
            .addEventListener('click', this._handleCardDelete);
        this.photo
            .addEventListener('click', this._renderOpenPopupImg);
    }
    _handleCardLike = (evt) => {
        evt.currentTarget.classList.toggle('elements__like_black');
    }
    _handleCardDelete = () => {
        this._card.remove();
        this._card = null;
    }
}