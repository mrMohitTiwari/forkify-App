// import { set } from "core-js/core/dict";
import { Set } from "core-js";
import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clearPrentEl();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    // console.log(markup);
  }
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const NewMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(NewMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currentDom = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const currEl = currentDom[i];
      // console.log(newEl.isEqualNode(currEl));
      // updates changed text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        currEl.textContent = newEl.textContent;
      }
      // updates attributes like dataset in button
      // it will return object of all the attrributes that has changed we convert it inot an arrray
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clearPrentEl() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    // console.log(markup);
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
                      <div>
                        <svg>
                          <use href="${icons}#icon-alert-triangle"></use>
                        </svg>
                      </div>
                      <p>${message}</p>
                    </div> 
`;
    this._clearPrentEl();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    // console.log(markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="message">
                      <div>
                        <svg>
                          <use href="${icons}#icon-smile"></use>
                        </svg>
                      </div>
                      <p>${message}</p>
                    </div> 
`;
    this._clearPrentEl();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    console.log(markup);
  }
}
