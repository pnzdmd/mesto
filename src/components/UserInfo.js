export default class UserInfo {
  constructor(name, about, avatar) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name:  this._name.textContent,
      description: this._about.textContent,
    };
  }

 setUserInfo(name, job) {
    this._name.textContent = name;
    this._about.textContent = job;
  }

  setUserAvatar(formAvatar){
    this._avatar.src = formAvatar;
  }
}