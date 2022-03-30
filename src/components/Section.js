export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }


  renderItems(initialCards) {
    initialCards.forEach(item => this._renderer(item));
  }

  
  addItem(element) {
    this._container.prepend(element);
  }
}