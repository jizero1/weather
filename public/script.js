// api키를 숨기기 위해 .gitignore파일에 apikey.js파일을 넣음. (github에 표시안됨)
import key from "../apikey.js";

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
// Clear sky (맑은 하늘) sun
// Few clouds (구름 조금) cloudSun
// Scattered clouds (흩어져 있는 구름) cloud
// Broken clouds (구름이 조금씩 깨어짐) cloud
// Overcast clouds (완전한 흐림) cloud
// Shower rain (소나기 비) rain1
// Rain (비) rain2
// Thunderstorm (천둥번개) blot
// Snow (눈) snow
// Mist (안개) smog
// Haze (연기) smog

// 현재 위치 기반으로 날씨 확인하기
navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `/api/weather?lat=${lat}&lon=${lon}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const city = data.name; // 도시이름
        const temp = data.main.temp;
        const description = data.weather[0].description; // 날씨의 상태
        const humidity = data.main.humidity; // 습도
        
        // 만약, description이 ~~이면, weather-icon에 ~~아이콘을 추가한다.
        const sun = `<i class="fa-solid fa-sun"></i>`;
        const cloudSun = `<i class="fa-solid fa-cloud-sun"></i>`;
        const cloud = `<i class="fa-solid fa-cloud"></i>`;
        const smog = `<i class="fa-solid fa-smog"></i>`;
        const rain1 = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
        const rain2 = `<i class="fa-solid fa-cloud-rain"></i>`;
        const bolt = `<i class="fa-solid fa-cloud-bolt"></i>`;
        const snow = `<i class="fa-solid fa-snowflake"></i>`;

        console.log(description);
        const icon = document.querySelector('.icon');
        icon.innerHTML = '';
        const statusText = document.querySelector('.statusText');


        switch(description) {
            case "clear sky" : icon.innerHTML = sun; statusText.innerText = "맑은 하늘"; break; //맑은 하늘
            case "few clouds" : icon.innerHTML = cloudSun; statusText.innerText = "구름 조금"; break; //구름조금
            case "scattered clouds" : icon.innerHTML = cloud; statusText.innerText = "흐린 하늘"; break; //흩어져있는 구름
            case "broken clouds" : icon.innerHTML = cloud; statusText.innerText = "구름 많음"; break; //구름이 깨진 구름
            case "overcast clouds": icon.innerHTML = cloud; statusText.innerText = "완전히 흐림"; break; //완전한 흐림
            case "shower rain" : icon.innerHTML = rain1; statusText.innerText = "소나기"; break; //소나기
            case "rain" : icon.innerHTML = rain2; statusText.innerText = "비"; break;//비
            case "thunderstorm" : icon.innerHTML = bolt; statusText.innerText = "천둥 번개";break; //천둥번개
            case "snow" : icon.innerHTML = snow; statusText.innerText = "눈"; break;//눈
            case "mist": case "haze": icon.innerHTML = smog; statusText.innerText = "안개";break; //안개,연기
        }
        // document.querySelector('.status').innerText=`${description}`;
        document.querySelector('.temp').innerText=`${temp.toFixed(2)}°C`;
        document.querySelector('.location').innerText=`${city}`;
    })
    .catch(error => {
        console.error('에러발생',error);
        alert('날씨 정보를 가져오는데 실패했습니다.');
    })
})


