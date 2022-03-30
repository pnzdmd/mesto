export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    this._userInfo = {};
    
    this._userInfo['title'] = this._name.textContent;
    this._userInfo['subtitle'] = this._about.textContent;

    return this._userInfo;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formValues) {
    this._name.textContent = formValues.name;
    this._about.textContent = formValues.about;
  }

  setUserAvatar(formValue) {
    this._avatar.src = formValue.avatar;
  }
}