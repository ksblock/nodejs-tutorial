const http = require('http');

http.createServer((req, res) => {
})
    .listen(8080, () => {
        console.log('8080 포트에 연결')
    });