import refs from './js/Refs';
import cardMarkup from './tamplates/cardMarcup.hbs';

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

let page = 1;

function onFormSubmit(e) {
  e.preventDefault();
  const value = e.currentTarget.elements.query.value;
  const BASE_URL = 'https://pixabay.com/api/';
  const queryParam = new URLSearchParams({
    key: '23292675-06f406722274daa99671b1028',
    image_type: 'photo',
    q: value,
    orientation: 'horizontal',
    // page: 1,
    per_page: 12,
  });

  fetch(`${BASE_URL}?${queryParam}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      renderCard(data);
      refs.loadMoreBtn.classList.remove('is-hidden');
    });

  function renderCard({ hits }) {
    refs.list.innerHTML = cardMarkup(hits);
  }
}

function incrementPage () {
  page += 1;
};

console.log(refs.form);

function onLoadMoreBtnClick() {
  incrementPage();
  const BASE_URL = 'https://pixabay.com/api/';
  const queryParam = new URLSearchParams({
    key: '23292675-06f406722274daa99671b1028',
    image_type: 'photo',
    q: refs.form.elements.query.value,
    orientation: 'horizontal',
    page: 1,
    per_page: 12,
  });

  fetch(`${BASE_URL}?${queryParam}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      renderCard(data);
      refs.loadMoreBtn.classList.remove('is-hidden');
    });

  function renderCard({ hits }) {
    const markup = cardMarkup(hits);
    refs.list.insertAdjacentHTML('beforeend', markup);
      
  }
}
