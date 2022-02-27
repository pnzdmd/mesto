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

  // проверяетполя на валидность
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // новый метод
  toggleButtonState() {
    const { inactiveButtonClass }  = this._settings;

    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  removeErrorProfile() {
    this._inputList.forEach(redLine => {
      redLine.classList.remove('popup__input_invalid');
     });
     const removeSpan = Array.from(document.querySelectorAll('.error'));
     removeSpan.forEach(span => {
      span.textContent = "";
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
    this._hasInvalidInput();
    this.toggleButtonState();
  }

  //метод вызова формы с запуском обработчика
  enableValidation() {
    this._setEventListeners();
  }
}