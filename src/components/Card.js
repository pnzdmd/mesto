export default class Card {
  constructor(data, cardSelector, handleCardClick, handleToggleLike) {
    this._cardSelector = cardSelector;
    this._title = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleToggleLike = handleToggleLike;
  }

  _getTemplate() { 
    const cardTemplateElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardTemplateElement;
  }

  toggleLike(isLiked) { 
    if (isLiked) {
      this._cardLikeBtn.classList.add('element__like-btn_active');
      this._isLiked = true;
    } else {
      this._cardLikeBtn.classList.remove('element__like-btn_active');
      this._isLiked = false;
    }
  }

  countLikes(likes) {
    this._likeCount = likes.length;
    this._cardLikeCount.textContent = this._likeCount;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener('click', () => {
      this._handleToggleLike(this, this._cardId, this._isLiked);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

     this._cardImage = this._cardElement.querySelector('.element__img');
     this._cardLikeBtn = this._cardElement.querySelector('.element__like-btn');
     this._cardLikeCount = this._cardElement.querySelector('.element__like-count');
     
     this._setEventListeners();
     this._cardElement.querySelector('.element__title').textContent = this._title;
     this._cardImage.src = this._link;
     this._cardImage.alt = this._title;
     this._cardLikeCount.textContent = this._likeCount;
  
     return this._cardElement;
   }
 }