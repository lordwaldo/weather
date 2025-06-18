function getWeather(){
    const apiKey = 'a84ac986de5d04489b2624860449cebd'
    const city = document.getElementById('city').value; 

    if(!city){
    alert("please enter a city")
    return;
}
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data=>{
            displayWeather(data);
        })
        .catch(error=>{
            console.error('error fetching current weather data:',error);
            alert("error fetching current weather data. please try again");
        });
    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data=>{
            displayHourlyForecast(data.list);
        })
        .catch(error=>{
            console.error('error fetching hourly forecast data:',error);
            alert("error fetching hourly forecast data. please try again");
        });
}


function displayWeather(data){
    const tempInfo = document.getElementById('temp');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecast = document.getElementById('hourly-forecast');
    //clear display
    weatherInfoDiv.innerHTML = ''
    hourlyForecast.innerHTML=''
    tempInfo.innerHTML=''
    
    if(data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`
    } else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const temperatureHTML = `<p>${temperature}</p>`;
        const weatherHTML = `<p>${cityName}</p>
                            <p>${description}</p>`;
        
        tempInfo.innerHTML=temperatureHTML;
        weatherInfoDiv.innerHTML=weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);

    next24Hours.forEach(item => {
        const dataTime = new Date(item.dt * 1000)
        const hour = dataTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
        </div>`;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display='block';
}