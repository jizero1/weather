// server/api/weather.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;  // .env에서 API 키 불러오기

router.get('/', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: '위도(lat)와 경도(lon)를 모두 제공해야 합니다.' });
    }

    try {
        const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat,
                lon,
                appid: OPENWEATHERMAP_API_KEY,  // API 키 사용
                units: 'metric',
                lang: 'kr'
            }
        });

        res.json(weatherResponse.data);

    } catch (error) {
        console.error('날씨 정보 요청 오류:', error);
        res.status(500).json({ error: '날씨 정보를 가져오는데 실패했습니다.' });
    }
});

module.exports = router;
