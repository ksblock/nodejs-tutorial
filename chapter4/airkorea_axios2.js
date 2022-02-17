const morgan = require('morgan');
const axios = require('axios');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/airkorea/detail', async(req, res) => {
    const serviceKey = "m7X1ZGUg3urOiTgL3S0fml%2Fzdgmb3jN95S3YdCCzhqNeltJyN6TYFqgEtZpjcKvEdqI2nmbS5%2BzFC7PqtMI1tQ%3D%3D";
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

    let parmas = encodeURI('serviceKey') + '=' + serviceKey;
    parmas += '&' + encodeURI('returnType') + '=' + encodeURI('json');
    parmas += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
    parmas += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    parmas += '&' + encodeURI('ver') + '=' + encodeURI('1.3');

    const url = airUrl + parmas;

    try {
        const result = await axios.get(url);
        console.log(result.data);
        const airItem = {
            "location": result.data.ArpltnInforInqireSvcVo["stationName"],
            "time": result.data.list[0]['dataTime'],
            "pm10": result.data.list[0]['pm10Value'],
            "pm25": result.data.list[0]['pm25Value']
        }

        const badAir = [];

        if(airItem.pm10 <= 30) {
            badAir.push("좋음");
        } else if (pm10 > 30 && pm10 <= 80) {
            badAir.push("보통");
        } else {
            badAir.push("나쁨");
        }

        if(airItem.pm25 <= 15) {
            badAir.push("좋음");
        } else if (pm25 > 15 && pm25 <= 35) {
            badAir.push("보통");
        } else {
            badAir.push("나쁨");
        }

        res.send('관측 지역: ${airItem.location} / 관측 시간: ${airItem.time} <br> 미세먼지 ${badAir[0]} 초미세먼지 ${badAir[1]}');

    } catch (error) {
        console.log(error);
    }
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'))
})