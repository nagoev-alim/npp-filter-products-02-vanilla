// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import mock from './data/mock.js';
import { capitalStr } from './modules/capitalStr.js';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='products'>
    <h2>Products Filter</h2>
    <div class='container'>
      <div class='filter'>
        <form data-form=''>
          <input name='query' type='search' data-search='' placeholder='Search'>
        </form>
        <h5>Company</h5>
        <ul data-companies=''></ul>
      </div>
      <div class='content' data-result=''>
      <ul class='list' data-products=''></ul>
    </div>
    </div>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.DOM = {
      form: document.querySelector('[data-form]'),
      search: document.querySelector('[data-search]'),
      list: document.querySelector('[data-products]'),
      result: document.querySelector('[data-result]'),
      companies: document.querySelector('[data-companies]'),
    };
    this.products = [...mock];

    this.renderProducts();
    this.renderCompanies();

    this.DOM.form.addEventListener('keyup', this.keyUpHandler);
    this.DOM.companies.addEventListener('click', this.filterHandler);
    this.DOM.search.addEventListener('search', this.searchHandler);
  }

  /**
   * @function renderProducts - Render products
   */
  renderProducts = () => {
    this.DOM.result.innerHTML = this.products.length === 0
      ? `<h5>😩 Sorry, no products matched your search</h5>`
      : `<ul class='list' data-products=''>${this.products.map(({ id, title, company, image, price }) => `
        <li data-id='${id}'>
          <div class='header'>
            <img src='${image}' alt='${title}'>
          </div>
          <div class='body'>
            <h3 class='h4'>${title}</h3>
            <p>${price}</p>
          </div>
        </li>
      `).join('')}
    </ul>
    `;
  };

  /**
   * @function renderCompanies - Render companies
   */
  renderCompanies = () => {
    this.DOM.companies.innerHTML =
      ['all', ...new Set(mock.map(({ company }) => company))]
        .map(company => `<li><button class='${company ==='all'}' data-filter-btn='' data-id='${company}'>${capitalStr(company)}</button></li>`)
        .join('');
  };

  /**
   * @function keyUpHandler - Key Up event handler
   * @param target
   */
  keyUpHandler = ({ target }) => {
    this.DOM.companies.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    this.products = mock.filter(({ title }) => title.toLowerCase().includes(target.value.toLowerCase()));
    this.renderProducts();
  };

  /**
   * @function filterHandler - Filter buttons click event handler
   * @param target
   */
  filterHandler = ({ target }) => {
    if (target.dataset.filterBtn === '') {
      this.DOM.companies.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');
      this.products = target.dataset.id === 'all' ? [...mock] : mock.filter(({ company }) => company === target.dataset.id);
      this.DOM.form.reset();
      this.renderProducts();
    }
  };

  /**
   * @function searchHandler - Search event handler
   */
  searchHandler = () => {
    this.products = [...mock];
    this.renderProducts();
  };
}

// ⚡️Class instance
new App();
