export default class Card {
  constructor(name, link, likes, id, userId, ownerId, cardTemplateSelector, { cardClick , delClick, likeClick }) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._userId = userId;
    this._ownerId = ownerId;
    this._template = document.querySelector(cardTemplateSelector).content;
    this._cardClick = cardClick;
    this._delClick = delClick;
    this._likeClick = likeClick;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  _addLike = () => {
    this._buttonLike.classList.add('element__like-btn_active');
  }

  _removeLike = () => {
    this._buttonLike.classList.remove('element__like-btn_active');
  }

  delImage  ()  {
    this._cardElement.remove();
  }

  setLike(newLikes) {
    this._likes = newLikes;
    this._likeCountElememnt.textContent = this._likes.length;

    if(this.isLiked()) {
      this._addLike();
    }
    else {
      this._removeLike();
    }
  }

  createCard = () => {
    this._cardElement = this._template.querySelector('.element').cloneNode(true);
    this._cardImg = this._cardElement.querySelector('.element__img');
    this._cardText = this._cardElement.querySelector('.element__title');
    this._buttonLike = this._cardElement.querySelector('.element__like-btn');
    this._buttonDel = this._cardElement.querySelector('.element__img_remove');
    this._likeCountElememnt = this._cardElement.querySelector('.element__like-count');
    
    this._cardText.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._setEventListeners();

    this.setLike(this._likes);

    if (this._ownerId !== this._userId) {
      this._buttonDel.style.display = 'none';
    }

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => { this._cardClick(this._name, this._link) });
    this._buttonLike.addEventListener('click', () => { this._likeClick(this._id) });
    this._buttonDel.addEventListener('click', () => { this._delClick(this._id) });
  }
}