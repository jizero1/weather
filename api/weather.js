// const express = require('express')
// const app = express()

// app.listen(8080, () => {
//     console.log('http://localhost:8080 에서 서버 실행중')
// })

// app.get('/', (요청, 응답) => {
//   응답.send('반갑다')
// }) 

// import express from "express";
// import path from "path";
// import axios from "axios";
// import key from "../apikey.js"; // 날씨 api 키값 불러오기
// import { fileURLToPath } from "url"; 


// const app = express();
// const PORT = 3000;

// // 현재 파일의 디렉터리 경로를 가져오는 코드
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);  // __dirname을 ES 모듈에서 사용할 수 있도록 설정

// // 정적 파일 제공 (index.html이 있는 경로를 설정)
// app.use(express.static(path.join(__dirname, "../"))); 

// app.get("/weather",async(req,res) => {
//   const {lat,lon} = req.query;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key.weatherKey}&units=metric`;
//   try {
//     const response = await axios.get(url);
//     res.json(response.data);
//   } catch(error) {
//     res.status(500).json({error : "날씨데이터를 가져오지 못했습니다."});
//   }
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../index.html"));  // weather-project 루트에 있는 index.html
// });
// // 서버 실행
// app.listen(PORT, () => {
//   console.log(`서버가 http://localhost:${PORT}에서 실행중입니다.`);
// });


// import axios from 'axios';
// import key from '../apikey.js'; // 날씨 API 키를 가져옴

// module.exports = async (req, res) => {
//   // 쿼리에서 lat, lon 값을 받아옴
//   const { lat, lon } = req.query;

//   // OpenWeatherMap API 호출 URL
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key.weatherKey}&units=metric&lang=kr`;

//   try {
//     const response = await axios.get(url);  // API 호출
//     res.status(200).json(response.data);  // 성공적인 응답
//   } catch (error) {
//     res.status(500).json({ error: '날씨 데이터를 가져오지 못했습니다.' });  // 오류 응답
//   }
// };




import axios from 'axios';

export default async function handler(req, res) {
  const { lat, lon } = req.query;
  
  // 환경 변수에서 API 키를 가져옵니다.
  const apiKey = process.env.WEATHER_API_KEY;

  // OpenWeatherMap API URL에 API Key를 포함하여 요청
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

  try {
    const response = await axios.get(url);  // 날씨 API 요청
    res.status(200).json(response.data);  // 성공적인 응답
  } catch (error) {
    if (error.response) {
      res.status(500).json({ error: `API error: ${error.response.data.message}` });
    } else if (error.request) {
      res.status(500).json({ error: 'API request failed. Please try again later.' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
}
