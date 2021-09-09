import refs from './js/Refs';
import cardMarkup from './tamplates/cardMarcup.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
refs.list.addEventListener('click', onPictureClick);
window.addEventListener('scroll', trackScroll);
refs.goTopBtn.addEventListener('click', backToTop);

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
      handleButtonClick();
    });

  function renderCard({ hits }) {
    const markup = cardMarkup(hits);
    refs.list.insertAdjacentHTML('beforeend', markup);
      
  }
}

const hiddenElement = refs.loadMoreBtn;
const btn = refs.formBtn;

function handleButtonClick() {
  hiddenElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

function onPictureClick(e) {
  if (!e.target.classList.contains('card-img')) {
    return;
  }
  
  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.largeImg}" width="800" height="600">
  `);
  instance.show();
}

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.goTopBtn.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refs.goTopBtn.classList.remove('back_to_top-show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}
