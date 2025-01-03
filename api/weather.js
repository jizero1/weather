// server.js

// 필요한 라이브러리 불러오기 (require 대신 import 사용)
import express from 'express';
import axios from 'axios';
import cors from 'cors';
// import { key } from '../apikey.js';  // apikey.js에서 API 키를 불러옵니다.
import dotenv from 'dotenv';

dotenv.config(); // .env 파일 로드

const key = process.env.OPENWEATHER_API_KEY;
// Express 서버 생성
const app = express();
const PORT = process.env.PORT || 3000; // 서버 포트 설정

// CORS 설정: 클라이언트에서 오는 요청을 허용
app.use(cors());

// 정적 파일 제공: /public 폴더 안의 HTML, CSS, JS 파일을 제공
app.use(express.static('public'));

// 날씨 정보 요청을 처리할 API 엔드포인트
app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;  // 클라이언트에서 받은 위도(lat)와 경도(lon)

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    try {
        // OpenWeather API에 날씨 정보 요청
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: lat,       // 위도
                lon: lon,       // 경도
                appid: `${key}`,     // API 키
                units: 'metric',  // 섭씨로 온도 설정
                // lang: 'kr',
            },
        });

        // 날씨 정보를 클라이언트로 응답
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong while fetching weather data' });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;  // Vercel에서는 이렇게 export 해야 합니다.
