// server/index.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');  // dotenv 패키지 불러오기
dotenv.config();  // 환경 변수 로드

const weatherRouter = require('./api/weather');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/weather', weatherRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행되고 있습니다.`);
});
