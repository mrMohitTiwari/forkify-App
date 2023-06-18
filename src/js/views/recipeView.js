import View from "./View";
import icons from "url:../../img/icons.svg";

class recipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not  find that Recipe. Please find another one";
  _message = "";

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle" ></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>  
    <button class="btn--round   btn--bookmark">
      <svg class="btn--round">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${this._generateMarkupIng(this._data.ingredients)}
      </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href=${this._data.sourceUrl}
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>

  </div>
    `;
  }
  _generateMarkupIng(ing) {
    return ing
      .map((ing) => {
        return `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? ing.quantity : ""
            }</div>
            <div class="recipe__description">
              <span class="recipe__unit">  ${ing.description}</span>
            
            </div>
          </li>`;
      })
      .join("");
  }

  //   renderMessage(message = this._message) {
  //     const markup = `<div class="message">
  //                       <div>
  //                         <svg>
  //                           <use href="${icons}#icon-smile"></use>
  //                         </svg>
  //                       </div>
  //                       <p>${message}</p>
  //                     </div>
  // `;
  //     this._clearPrentEl();

  //     this._parentElement.insertAdjacentHTML("afterbegin", markup);
  //     console.log(markup);
  //   }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      console.log(btn);
      // here update-to converted to camelcasing
      const updateTo = +btn.dataset.updateTo;
      console.log(updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }
  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }
}
// we can export the class from here but we will export an object so that the controller not get loaded and data wil be secured
export default new recipeView();
