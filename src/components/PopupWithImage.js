import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._caption = this._popup.querySelector('.popup__image-title');
    this._popupPhoto = this._popup.querySelector('.popup__image');
  }

  open({ name, link }) {
    this._caption.textContent = name;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    super.open();
  }
}