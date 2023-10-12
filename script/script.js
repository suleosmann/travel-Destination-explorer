// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const countryNameElem = document.querySelector('.country-name');
const countryImageElem = document.querySelector('.country-image');
const populationElem = document.getElementById('population');
const currencyElem = document.getElementById('currency');
const languageElem = document.getElementById('language');
const descriptionElem = document.querySelector('.description');
const favoriteBtn = document.querySelector('.favorite-btn');
const sortFilter = document.getElementById('sort-filter');
const countriesListElem = document.querySelector('.countries-list');
const viewFavoritesBtn = document.getElementById('view-favorites-btn');
const favoritesSection = document.getElementById('favorites-section');
const favoritesListElem = document.getElementById('favorites-list');


// Event Listener for Search Button
searchBtn.addEventListener('click', function() {
    const countryName = searchInput.value.trim(); // Get input value

    if (countryName) {
        fetchCountryData(countryName); // Fetch data for the entered country
    } else {
        alert('Please enter a country name.');
    }
});

// Function to fetch country data
function fetchCountryData(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,population,currencies,languages,altSpellings`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Update UI with fetched data
            const country = data[0]; // Assuming the first result is the most relevant
            updateUI(country);
        })
        .catch(error => {
            console.error("Error fetching country data:", error);
            alert('Failed to fetch country data. Please try again or check the country name.');
        });
}

// Function to update the UI with country data
function updateUI(country) {
    countryNameElem.textContent = country.name.common;
    countryImageElem.src = country.flags.png;
    populationElem.textContent = country.population;
    currencyElem.textContent = Object.values(country.currencies)[0].name; // Get the first currency name
    languageElem.textContent = Object.values(country.languages)[0]; // Get the first language
    descriptionElem.textContent = `Also known as: ${country.altSpellings.join(', ')}`;
}

// Event Listener for Favorite Button
favoriteBtn.addEventListener('click', function() {
    const currentCountry = countryNameElem.textContent;
    
    // Check if a valid country is displayed
    if(currentCountry && currentCountry !== "Country/City Name") {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(currentCountry)) {
            favorites.push(currentCountry);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Country favorited!');
        } else {
            alert('Country already in favorites!');
        }
    } else {
        alert('Please search for a valid country before favoriting.');
    }
});
//making enter through keyboard to work
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const countryName = searchInput.value.trim();
        if (countryName) {
            fetchCountryData(countryName);
        } else {
            alert('Please enter a country name.');
        }
    }
});
const formElement = document.querySelector('form');  // Adjust the selector if needed



// Event Listener for Sort Filter
sortFilter.addEventListener('change', function() {
    const sortBy = sortFilter.value;
    if (sortBy === 'population') {
        fetchCountriesList('Asia'); // Fetching countries from Asia as an example
    }
});

// Fetch a list of countries (for demonstration, let's assume the API provides a list when given a continent like 'Asia')
function fetchCountriesList(continent) {
    const apiUrl = `https://restcountries.com/v3.1/region/${continent}?fields=name,population`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.population - a.population); // Sort by population
            displayCountriesList(data);
        })
        .catch(error => {
            console.error("Error fetching countries list:", error);
        });
}

// Display the list of countries
function displayCountriesList(countriesData) {
    countriesListElem.innerHTML = ''; // Clear any existing countries

    countriesData.forEach(country => {
        const countryElem = document.createElement('article');
        countryElem.innerHTML = `
            <h3>${country.name.common}</h3>
            <p>Population: ${country.population}</p>
        `;
        countriesListElem.appendChild(countryElem);
    });
}
// Event Listener for "View Favorites" Button
viewFavoritesBtn.addEventListener('click', function() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    displayFavorites(favorites);
});

// Function to display the favorited countries
function displayFavorites(favorites) {
    favoritesListElem.innerHTML = ''; // Clear any existing favorites

    if (favorites.length === 0) {
        favoritesListElem.innerHTML = '<li>No favorited countries yet.</li>';
    } else {
        favorites.forEach(countryName => {
            const li = document.createElement('li');
            li.textContent = countryName;
            favoritesListElem.appendChild(li);
        });
    }

    // Toggle the display of the favorites section
    if (favoritesSection.style.display === 'none') {
        favoritesSection.style.display = 'block';
    } else {
        favoritesSection.style.display = 'none';
    }
}

