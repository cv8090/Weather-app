async function getCurrentweatherByCity(city) {

    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=f39f441fd6b54c2f95692727240611&q=${city}&aqi=no`)
    const currntweather = await data.json();
    console.log(currntweather)
    return currntweather;
}
async function getForecastByCity(city) {

    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=f39f441fd6b54c2f95692727240611&q=${city}&aqi=no`)
    const forecast = await data.json();
    console.log(forecast)
    return forecast;
}


const locationInput = document.querySelector('.location-input')

const locationButton = document.querySelector('.location-button')


locationButton.addEventListener('click', async() => {
    const locationInputValue = locationInput.value
    const currentWeather = await getCurrentweatherByCity(locationInputValue)
    const forecast = await getForecastByCity(locationInputValue)


    const currentWeatherIcon = `http:${currentWeather.current.condition.icon}`;
    const currentWeatherTemperature = currentWeather.current.temp_c
    const currentWeatherStatus = currentWeather.current.condition.text

    resetWeatherApp()

    renderCurrentWeather(currentWeatherIcon, currentWeatherTemperature, currentWeatherStatus)

    renderForecast(forecast.forecast.forecastday[0].hour)


})



function renderCurrentWeather(iconSrc, temperature, status) {
    const currentWeatherIconEl = document.createElement('img')
    currentWeatherIconEl.setAttribute('class', "current-weather-icon")
    currentWeatherIconEl.setAttribute('src', iconSrc)

    const currentWeatherTemperatureEl = document.createElement('span')
    currentWeatherTemperatureEl.setAttribute('class', "current-weather-temperature")
    currentWeatherTemperatureEl.textContent = temperature


    const currentWeatherStatusEl = document.createElement('span')
    currentWeatherStatusEl.setAttribute('class', "current-weather-status")
    currentWeatherStatusEl.textContent = status


    const currentWeather = document.querySelector('.current-weather')
    currentWeather.innerHTML = '';
    currentWeather.appendChild(currentWeatherIconEl)
    currentWeather.appendChild(currentWeatherTemperatureEl)
    currentWeather.appendChild(currentWeatherStatusEl)


}

async function getForecastByCity(city) {
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f39f441fd6b54c2f95692727240611&q=${city}&days=1&aqi=no`)
    const forecast = await data.json();
    console.log(forecast)
    return forecast;
}


function createForecastElement(iconSrc, time, temperatura) {
    const forecastElement = document.createElement('div')
    forecastElement.setAttribute('class', "forecastElement")

    const forecastTime = document.createElement('p')
    forecastTime.setAttribute('class', "forecast-tim")
    forecastTime.innerHTML = time.slice(11)

    const forecastIcon = document.createElement('img')
    forecastIcon.setAttribute('class', "forecast-icon")
    forecastIcon.setAttribute('src', `http:${iconSrc}`)

    const forecastTemperature = document.createElement('p')
    forecastTemperature.setAttribute('class', "forecast-temperature")
    forecastTemperature.innerHTML = temperatura


    forecastElement.appendChild(forecastTime)
    forecastElement.appendChild(forecastIcon)
    forecastElement.appendChild(forecastTemperature)

    return forecastElement
}


function renderForecast(forecast) {
    const forecastContainer = document.querySelector(".forecast")
    forecast.forEach(forecastItem => {
        const forecastElement = createForecastElement(forecastItem.condition.icon, forecastItem.time, forecastItem.temp_c)
        forecastContainer.appendChild(forecastElement)
    })
}

function resetWeatherApp() {
    const currentWeather = document.querySelector('.current-weather')
    currentWeather.innerHTML = ''


    const forecastContainer = document.querySelector(".forecast")
    forecastContainer.innerHTML = ''
}