export default class Card {
  constructor(title, link, likes, id, userId, ownerId, cardTemplateSelector, { cardClick , delClick, likeClick }) {
    this._title = title;
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
    const userLikedCard = this._likes.find(user => user._id === this._userId);
    return userLikedCard;
  }

  _addLike = () => {
    this._cardLikeBtn.classList.add('element__like-btn_active');
  }

  _removeLike = () => {
    this._cardLikeBtn.classList.remove('element__like-btn_active');
  }

  delImage  ()  {
    this._cardElement.remove();
  }

  setLike(newLikes) {
    this._likes = newLikes;
    this._cardLikeCount.textContent = this._likes.length;

    if(this.isLiked()) {
      this._addLike();
    }
    else {
      this._removeLike();
    }
  }

  createCard = () => {
    this._cardElement = this._template.querySelector('.element').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__img');
    this._cardText = this._cardElement.querySelector('.element__title');
    this._cardLikeBtn = this._cardElement.querySelector('.element__like-btn');
    this._buttonDel = this._cardElement.querySelector('.element__img_remove');
    this._cardLikeCount = this._cardElement.querySelector('.element__like-count');
    
    this._cardText.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;

    this._setEventListeners();

    this.setLike(this._likes);

    if (this._ownerId !== this._userId) {
      this._buttonDel.style.display = 'none';
    }

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => { this._cardClick(this._title, this._link) });
    this._cardLikeBtn.addEventListener('click', () => { this._likeClick(this._id) });
    this._buttonDel.addEventListener('click', () => { this._delClick(this._id) });
  }
}