import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__image');
    this._caption = document.querySelector('.popup__image-title');
  }

  open(name, link) {
    this._caption.textContent = name;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    super.open();
  }
}