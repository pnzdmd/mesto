export default class PopupError {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._errorDescription = this._popup.querySelector('.popup-error__description');
    this._errorCode = this._popup.querySelector('.popup-error__code');
  }

  open(data) {
    this._popup.classList.add('popup-error_opened');
    this._errorDescription.textContent = data.statusText;
    this._errorCode.textContent = `Код ошибки: ${data.status}`;
    setTimeout(() => {
      this._close();
    }, 5000);
  }

  _close() {
    this._popup.classList.remove('popup-error_opened');
  }
}