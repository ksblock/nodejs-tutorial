const morgan = require('morgan');
const axios = require('axios');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/airkorea', async(req, res) => {
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
        res.json(result.data);
    } catch (error) {
        console.log(error);
    }
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'))
});