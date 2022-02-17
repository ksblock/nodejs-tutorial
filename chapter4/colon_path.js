const express = require('express');
const res = require('express/lib/response');
const app = express();

app.get('/:type', (req, res) => {
    let { type } = req.params;
    res.send(type);
});

app.listen(8080);