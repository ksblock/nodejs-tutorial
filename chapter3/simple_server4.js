const http = require('http');

http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('hello');
        res.end()
    }
})
    .listen(8080, () => {
        console.log('8080')
    });