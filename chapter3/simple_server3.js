const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=urf-8' });
    res.write('<h1>Node.js 서버</h1>');
    res.end('<p>ch3 http module</p>')
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080 포트 연결');
})

server.on('error', () => {
    console.error(error);
})