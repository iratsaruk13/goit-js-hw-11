// import './css/styles.css';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
// import fetchCountries from './fetchCountries';

const inputSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfoBox = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputSearchBox.addEventListener(
  'input',
  debounce(onInputSeach, DEBOUNCE_DELAY)
);

function onInputSeach(evt) {
  const seachCountry = evt.target.value.trim();

  if (seachCountry === '') {
    clearMarkup();
  }

  fetchCountries(seachCountry)
    .then(data => {
      clearMarkup();
      onCheckingInputValue(data);
    })
    .catch(onCatchError);
}

function onCheckingInputValue(country) {
  if (country.length >= 2 && country.length <= 10) {
    createCountryList(country);
    return;
  }

  if (country.length === 1) {
    createCountryMarkup(country);
    return;
  }

  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
}

function createCountryList(countries) {
  const countryListMarkup = ({ flags, name }) => {
    return `<li class="country-list-item">
        <img src="${flags.svg}" alt="${flags.alt}" width="40" height="25">
        <p>${name.official}</p>
        </li>`;
  };

  const createCountryListMarkup = countries.map(countryListMarkup).join('');
  countryList.insertAdjacentHTML('afterbegin', createCountryListMarkup);
}

function createCountryMarkup(countries) {
  const createCountryCard = ({
    name,
    capital,
    population,
    flags,
    languages,
  }) => {
    return `
 <img src="${flags.svg}" alt="${flags.alt}" width="150" height="100">
<h2 class="country-title">${name.official}</h2>
<ul>
    <li class="country-list-item"> <p class="text-list"> Capital: </p> <p>${capital}</p></li>
    <li class="country-list-item"> <p class="text-list"> Population: </p> <p>${population}</p></li>
    <li class="country-list-item"> <p class="text-list"> Languages:</p> <p>${Object.values(
      languages
    )}</p></li>
</ul>`;
  };

  const createCardMarkup = countries.map(createCountryCard);
  countryInfoBox.innerHTML = createCardMarkup;
}

function clearMarkup() {
  countryList.innerHTML = '';
  countryInfoBox.innerHTML = '';
}

function onCatchError() {
  return Notiflix.Notify.failure(
    `❌ Oops, there is no country with that name :(`
  );
}
