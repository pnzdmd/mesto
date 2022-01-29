const validationObj = {
  formSelector: '.popup__form', // форма попапов
  inputSelector: '.popup__input', // инпуты форм
  submitButtonSelector: '.popup__btn-save', // кнопка сохранить в форме отправки??
  inactiveButtonClass: 'popup__button_disabled', // отсутствует
  inputErrorClass: 'popup__btn-save_card_invalid', // убираю кнопку сохранить при ошибке
  errorClass: 'popup__input_invalid' // подчеркивние инпута красным если есть ошибка
};



function enableValidation({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}) {
  const forms = Array.from(document.querySelectorAll(formSelector)); // нашел все формы инпута
  forms.forEach(form => { // накладываю процесс валидации
    form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // отключил отправку формы 
    });
    handleFieldValidation(form, {inputSelector, submitButtonSelector, inputErrorClass, errorClass});
  })
}



function handleFieldValidation(form, {inputSelector, submitButtonSelector, inputErrorClass, errorClass}) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));// нахожу все инпуты в форме
  inputs.forEach(input => { // накладываю обработчик на инпуты
    input.addEventListener('input', () => { // проверяю input на валидность 
      input.classList.toggle(errorClass, !input.validity.valid);
      const errorContainer = document.querySelector(`#${input.id}-error`);  //находит span
      errorContainer.textContent = input.validationMessage;  // передает span стандартные ошибки
    });
  });
  buttonToggle(form, {submitButtonSelector, inputErrorClass});
  form.addEventListener('input', () => {
    buttonToggle(form, {submitButtonSelector, inputErrorClass});
  });
}

// функция валидации кнопки
function buttonToggle(form, {submitButtonSelector, inputErrorClass}) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = !form.checkValidity();
  button.disabled = isFormValid;
  button.classList.toggle(inputErrorClass, isFormValid);
}



enableValidation(validationObj);