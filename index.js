window.addEventListener('load', () => {
  let long;
  let lat;
  let key;
  let locationArea = document.querySelector('.location-area');
  let temperature = document.querySelector('.temperature-degree');
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let degreeSection = document.querySelector('.degree-section');
  let temperatureSign = document.querySelector('.degree-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      key = '0ebf0e29926cc939f557a936228e1129';

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var tempInCelsius = data.main.temp - 273.15; // Converting temperature from Kelvin to Celsius

          var Area = data.name;
          var Country = data.sys.country;
          var Weather = data.weather[0].main;

          // Displaying Information gathered from API
          locationArea.textContent = `${Area} - ${Country}`;
          temperatureDescription.textContent = Weather;
          temperature.textContent = tempInCelsius;

          degreeSection.addEventListener('click', () => {
            if (temperatureSign.textContent === 'F') {
              temperature.textContent = tempInCelsius;
              temperatureSign.textContent = 'C';
            } else {
              temperature.textContent = tempInCelsius * 1.8 + 32;
              temperatureSign.textContent = 'F';
            }
          });
        });
    });
  }
});
