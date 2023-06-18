class SearchView {
  _parentElement = document.querySelector(".search");
  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInputfield();
    return query;
  }
  _clearInputfield() {
    this._parentElement.querySelector(".search__field").value = "";
  }
  addHandlerSerach(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
