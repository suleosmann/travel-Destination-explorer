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
            alert('Failed to fetch country data. Please try again.');
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
    // Logic for favoriting a country (e.g., save to local storage, change button color, etc.)
    alert('Country favorited! (Note: Implement actual favoriting logic here)');
});
