import View from "./View";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _message = "Recipe was Succesfully uploaded ;)";
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  constructor() {
    super();
    // as it has nothing to do with controller
    this._addHandlerShowWindow();
    this._addHandlerhideWindow();
  }
  _toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerhideWindow() {
    this._btnClose.addEventListener("click", this._toggleWindow.bind(this));
    this._overlay.addEventListener("click", this._toggleWindow.bind(this));
  }
  _addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //we are passing this to tell which elements form to data reterive it returns  a object which we will spread in an array
      // coverting this array an object by using ES-19 method
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this._toggleWindow.bind(this));
  }
}
export default new AddRecipeView();
