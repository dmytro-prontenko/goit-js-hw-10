import { BREEDS_URL, IMAGES_URL } from './index';

function fetchBreeds(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  const catInfoUrl = `${IMAGES_URL}/${breedId}`;
  return fetch(catInfoUrl).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
