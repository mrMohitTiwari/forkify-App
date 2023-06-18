import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    if (this._data.page === 1 && numPages > 1)
      return ` 
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="icons#icon-arrow-right"></use>
    </svg>
  </button>`;
    if (this._data.page === numPages && numPages > 1)
      return `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          `;
    if (currentPage < numPages)
      return `    <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="icons#icon-arrow-right"></use>
                    </svg>
                </button>
                <button data-goto="${
                  currentPage - 1
                }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
                </button>
  `;
    //. we are in page one and there are  other pages
    //. we are in page one and there are no other pages
    return ``;
    // last page
    // some other page
  }
  addHaandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) console.log(btn);
      const goto = +btn.dataset.goto;

      handler(goto);
    });
  }
}
export default new PaginationView();
