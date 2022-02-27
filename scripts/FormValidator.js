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
      console.log('hasInvalidInput проверка на валидность');
      return !inputElement.validity.valid;
    });
  };

  // новый метод
  toggleButtonState() {
    const { inactiveButtonClass }  = this._settings;

    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(inactiveButtonClass);
      console.log('не валидное');

    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
      console.log('валидное');
    }
  }

  removeErrorProfile() {
    this._inputList.forEach(redLine => {
      redLine.classList.remove('popup__input_invalid');
      console.log('удалил подчеркивание');
     });
     const removeSpan = Array.from(document.querySelectorAll('.error'));
     removeSpan.forEach(span => {
      span.textContent = "";
      console.log('удалили ошибки в спан');
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checInputValidity(inputElement);
        this.toggleButtonState();
        console.log('setevent');
      });
    });
    this._hasInvalidInput();
    this.toggleButtonState();
  }

  //метод вызова формы с запуском обработчика
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}



/*  disableButton() {
    const { inactiveButtonClass }  = this._settings;

    this._buttonElement = this._form.querySelector(this._buttonElement);
    this._buttonElement.classList.add(inactiveButtonClass);
    this._buttonElement.disabled = true;
  } */


  

 
  /* _disableSubmitButton = () => {
    const { inactiveButtonClass }  = this._settings;

    this._buttonElement.classList.add(inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = () => {
    const { inactiveButtonClass }  = this._settings;
    console.log('деактивация кнопки');
    this._buttonElement.classList.remove(inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState = () => {
    //если инпут не валидный то кнопка не активна
    if(this._hasInvalidInput()) {
      this._disableSubmitButton();
      console.log('функция запуска валидации if');
    } else {
      // если кнопка валдина то активна
      this._enableSubmitButton();
      console.log('функция запуска валидации else');
    }
  }; */