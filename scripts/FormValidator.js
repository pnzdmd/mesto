export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;

    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }
  // что такое errorElement
  _showInputError = (inputElement, errorMessage) => {
    const {errorClass, inputSelector, inputErrorClass} = this._settings;

    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(errorClass);
  }
  _hideInputError = (inputElement) => {
    const {errorClass, inputErrorClass} = this._settings;

    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    inputElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  //проверка валидности
  _checInputValidity = (inputElement) => {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableSubmitButton = () => {
    const { inactiveButtonClass }  = this._settings;

    this._buttonElement.classList.add(inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = () => {
    const { inactiveButtonClass }  = this._settings;

    this._buttonElement.classList.remove(inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState = () => {
    //если инпут не валидный то кнопка не активна
    if(this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      // если кнопка валдина то активна
      this._enableSubmitButton();
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //метод вызова формы с запуском обработчика
  enableValidation() {
    //formElement переменная формы, передается через слектор класса
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}