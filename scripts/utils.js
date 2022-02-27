import { closeImgPopap, popupImg } from "./constans.js";

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEventListenerPopup(popup);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEventListenerPopup(popup);
}

function addEventListenerPopup(popup) {
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('click', clickOverlay);
}

function removeEventListenerPopup(popup) {
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('click', clickOverlay);
}

function closeByEsc(evt) {
  if(evt.key === 'Escape') {
    const esc = document.querySelector('.popup_opened');
    closePopup(esc);
  }
}

function clickOverlay(evt) {
  const openPoput = evt.target;
  if(evt.target === evt.currentTarget) {
    closePopup(openPoput);
  }
}

closeImgPopap.addEventListener('click', ()=> {
  closePopup(popupImg);
});