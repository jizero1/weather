import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/weather', (req, res) => {
    const weatherData = {
        location: 'Seoul',
        temperature: 22,
        description: 'clear sky',
    };
    res.json(weatherData);
});

app.listen(port, () => {
    console.log("server started....");
    console.log(`server is running at http://localhost:${port}`);
});