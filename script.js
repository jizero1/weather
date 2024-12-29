// apiKey : 발급받은 api키, city : 조회할 도시이름, url : api url
// const apiKey = 'd023cf7a792d5fc8da15034053f88758';
import key from "./apikey.js";
const city = 'Seoul';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key.weatherKey}`;

fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);
    const temp = data.main.temp; // 온도
    const description = data.weather[0].description; // 날씨
    const humidity = data.main.humidity; // 습도

    document.querySelector('.weather').innerText=`온도:${temp}°C, 날씨:${description}, 습도:${humidity}%`;
})
.catch(error => {
    console.error('에러발생',error);
    alert('날씨 정보를 가져오는데 실패했습니다.');
})
