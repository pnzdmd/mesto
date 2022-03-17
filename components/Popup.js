export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._eventHandler = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._eventHandler);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._eventHandler);
  }
  
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__btn-close')) )
      this.close();
    });
  }
}