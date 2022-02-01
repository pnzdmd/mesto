const validationObj = {
  formSelector: '.popup__form', // форма попапов
  inputSelector: '.popup__input', // инпуты форм
  submitButtonSelector: '.popup__btn-save', // кнопка сохранить в форме
  inputErrorClass: 'popup__btn-save_card_invalid', // убираю кнопку сохранить при ошибке
  errorClass: 'popup__input_invalid' // подчеркивние инпута красным если есть ошибка
};

// функция отмены стандартных действий
function enableValidation({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}) {
  const forms = Array.from(document.querySelectorAll(formSelector)); // нашел все формы инпута
  forms.forEach(form => {
    setEventListeners(form, {inputSelector, submitButtonSelector, inputErrorClass, errorClass});
  })
}

// функция по валидации формы
function setEventListeners(form, {inputSelector, submitButtonSelector, inputErrorClass, errorClass}) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));// нахожу все инпуты в форме
  inputList.forEach(input => { // накладываю обработчик на инпуты
    input.addEventListener('input', () => { // проверяю input на валидность 
      input.classList.toggle(errorClass, !input.validity.valid);
      const errorElement = document.querySelector(`#${input.id}-error`);  //находит span
      errorElement.textContent = input.validationMessage;  // передает span стандартные ошибки
    });
  });
  toggleButtonState(form, {submitButtonSelector, inputErrorClass});
  form.addEventListener('input', () => {
    toggleButtonState(form, {submitButtonSelector, inputErrorClass});
  });
}

// функция валидации кнопки
function toggleButtonState (form, {submitButtonSelector, inputErrorClass}) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = !form.checkValidity();
  button.disabled = isFormValid;
  button.classList.toggle(inputErrorClass, isFormValid);
}


enableValidation(validationObj);