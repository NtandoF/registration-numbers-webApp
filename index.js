const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Registry = require('./routes/reg.js')
const Reg_numbers = require('./services/registrations')
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:1234@localhost:5432/registration';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

let registrationNum = Reg_numbers(pool);
let regRoute = Registry(registrationNum)


let app = express();

app.use(session({
    secret: 'keyboard us3rs',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: "bill",
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', regRoute.home);
app.post('/reg_numbers', regRoute.RegAddition);
app.post('/registrationnumber', regRoute.regNumbers);
app.post('/clear', async function (req, res,) {
    await pool.query('delete from reg;');
    res.redirect('/')
});


let PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});