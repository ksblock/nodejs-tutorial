const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 8080)

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@1234'));
app.use(session({
    secret: 'secret@1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    if(req.session.name) {
        const output = `
                <h2>로그인함</h2>
                <p>${req.session.name}</p>
            `
        res.send(output);
    } else {
        const output = `
                <h2>로그인 안 함</h2>
                <p>로그인 하세여</p>
            `
        res.send(output);
    }
});

app.get('/login', (req, res) => {
    console.log(req.session);
    req.session.name = 'ks1101';
    res.end('Login Ok')
});

app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    res.end('Logout Ok');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'))
});