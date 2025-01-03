

// ---------------- 현재 날짜와 요일 표시 부분 ---------------- //
let now = new Date();
let month = now.getMonth()+1;
let date = now.getDate();
let day = now.getDay();
let dayName; // 요일을 한글로 표시
switch(day) {
    case 1: dayName = "월"; break;
    case 2: dayName = "화"; break;
    case 3: dayName = "수"; break;
    case 4: dayName = "목"; break;
    case 5: dayName = "금"; break;
    case 6: dayName = "토"; break;
    case 0: dayName = "일"; break;
}
const dateAdd = month+"월 "+date+"일 "+dayName+"요일";
document.querySelector('.date').innerText=`${dateAdd}`;



// ---------------- 날씨 정보 표시 ---------------- //

// 현재 위치 기반으로 날씨 확인하기
navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `/api/weather?lat=${lat}&lon=${lon}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const city = data.name; // 도시이름
        const temp = data.main.temp; // 기온
        const weather = data.weather[0].id; // 날씨 상태코드 (ex. 800은 맑음)
        const clouds = data.clouds.all; // 구름의 양
        const humidity = data.main.humidity; // 습도
        const windSpeed = data.wind.speed; // 바람 속도
        const sunrise = data.sys.sunrise; // 일출 시간
        const sunset = data.sys.sunset; // 일몰 시간

        const sunriseDate = new Date(sunrise * 1000);
        const sunsetDate = new Date(sunset * 1000);

        document.querySelector('.sunrise').insertAdjacentText('beforeend',`${sunriseDate.toLocaleTimeString()}`);
        document.querySelector('.sunset').insertAdjacentText('beforeend',`${sunsetDate.toLocaleTimeString()}`);
        document.querySelector('.windSpeed').insertAdjacentText('beforeend',`${windSpeed}m/s`);
        document.querySelector('.clouds').insertAdjacentText('beforeend',`${clouds}`);
        document.querySelector('.hum').insertAdjacentText('beforeend',`${humidity}%`);

        const icon = document.querySelector('.icon');
        const statusText = document.querySelector('.statusText');

        switch(weather) {
            case 800 : icon.innerText = `sunny`; statusText.innerHTML = '맑음'; break; // 맑은 하늘
            case 801 : icon.innerText = `partly_cloudy_day`; statusText.innerHTML = '구름 조금'; break; // 구름 조금
            case 802 : case 803 : case 804 : icon.innerText = `cloud`; statusText.innerHTML = '구름 많음'; break; // 구름 많음
            case 701 : case 741 : icon.innerText = `foggy`; statusText.innerHTML = '안개'; break; // 안개
            case 711 : case 721 : icon.innerText = `mist`; statusText.innerHTML = '안개와 연기';  break; // 연기
            case 731 : case 751 : case 761 : case 762 : case 771 : case 781 : icon.innerText = `storm`; statusText.innerHTML = '폭풍'; break; // 폭풍
            case 600 : case 601 : case 613 : icon.innerText = `weather_snowy`; statusText.innerHTML = '적은 양의 눈'; break; // 가벼운 눈
            case 602 : icon.innerText = `snowing_heavy`; statusText.innerHTML = '많은 양의 눈'; break; // 강한 눈
            case 611 : case 612 : case 615 : case 616 : case 620 : case 621 : case 622 : case 511 : icon.innerText = `rainy_snow`; statusText.innerHTML = '눈과 비';break; // 눈과 비
            case 500 : case 501 : case 520 : case 300 : case 301 : case 302 : case 311 : icon.innerText = `rainy`; statusText.innerHTML = '적은 양의 비'; break; // 가벼운 비
            case 502 : case 503 : case 504 : case 521 : case 522 : case 531 : case 310 : case 312 : case 313 : case 314 : case 321 : icon.innerText = `rainy_heavy`;statusText.innerHTML = '많은 양의 비'; break; // 강한 비
            case 200 : case 201 : case 202 : case 210 : case 211 : case 212 : case 221 : case 230 : case 231 : case 232 : icon.innerText = `thunderstorm`; statusText.innerHTML = '천둥번개'; break; // 천둥번개
        }

        document.querySelector('.temp').innerText=`${temp.toFixed(2)}°C`;
        document.querySelector('.location').innerText=`${city}`;
    })
    .catch(error => {
        console.error('에러발생',error);
        alert('날씨 정보를 가져오는데 실패했습니다.');
    })
})


