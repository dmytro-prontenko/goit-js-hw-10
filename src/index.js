import axios from 'axios';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_QgS1adkVIQswiFkVFJfUwfdfR5Xz4BrbsZbK7oXezZ3f5HbRuh01mJxPcPLS5jaY';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.select.addEventListener('change', onSelectChange);
refs.select.classList.toggle('is-hidden');
refs.loader.classList.toggle('is-hidden');
refs.error.classList.toggle('is-hidden');

function onSelectChange(event) {
  const currentOption = event.target.options[refs.select.selectedIndex].value;
  refs.loader.classList.toggle('is-hidden');
  refs.catInfo.classList.toggle('is-hidden');

  fetchCatByBreed(currentOption)
    .then(data => {
      // refs.loader.classList.toggle('is-hidden');
      // refs.catInfo.classList.toggle('is-hidden');
      createCardInfo(data);
    })
    .catch(err => {
      // refs.catInfo.classList.toggle('is-hidden');
      // refs.loader.classList.toggle('is-hidden');
      refs.catInfo.innerHTML = '';

      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try choose another breed!'
      );
      console.log(err);
    })
    .finally(
      setTimeout(
        (refs.loader.classList.toggle('is-hidden'),
        refs.catInfo.classList.toggle('is-hidden')),
        500
      )
    );
}
export const BREEDS_URL = `https://api.thecatapi.com/v1/breeds`;
export const IMAGES_URL = `https://api.thecatapi.com/v1/images`;

// refs.loader.classList.add('is-hidden');
setTimeout(
  fetchBreeds(BREEDS_URL)
    .then(data => {
      refs.loader.classList.toggle('is-hidden'),
        refs.select.classList.toggle('is-hidden'),
        refs.select.insertAdjacentHTML('beforeend', createSelectMarkup(data));
      new SlimSelect({
        select: refs.select,
      });
      refs.loader.classList.toggle('is-hidden');

      return data;
    })
    .catch(err => {
      refs.loader.classList.add('is-hidden');
      refs.select.classList.toggle('is-hidden');

      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(err);
    })
    .finally(refs.loader.classList.add('is-hidden')),
  2000
);

function createSelectMarkup(arr) {
  return arr
    .map(el => `<option value="${el.reference_image_id}">${el.name}</option>`)
    .join('');
}

function createCardInfo(arr) {
  const {
    id,
    url,
    breeds: [{ description, temperament, name }],
  } = arr;

  refs.catInfo.classList.toggle('is-hidden');
  refs.loader.classList.toggle('is-hidden');
  setTimeout(() => {
    refs.catInfo.innerHTML = `
    <img class="js-cat-img" src="${url}" alt="${name}"/>
    <wrapper>
    <h2>${name}</h2>
    <h3>Description</h3>
    <p class="js-cat-info">${description}</p>
    <h3>Temperament</h3>
    <p class="js-cat-info">${temperament}</p>
    </wrapper>
    `;
    refs.loader.classList.toggle('is-hidden');
    refs.catInfo.classList.toggle('is-hidden');
  }, 1000);
}
