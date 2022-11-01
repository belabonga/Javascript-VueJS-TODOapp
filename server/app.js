if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else if (process.env.NODE_ENV === 'production') {
    // TO CLEAR CONSOLE LOGS BEFORE DEPLOYING
    console.log = function () {};
}

const cors                  = require('cos')
    , express               = require('express')
    , app                   = express()
    , { authentication }    = require('../../middleware/authentication') 

    , ControllerSession = require('./controllers/session');

app.use(cors());
app.use(express.urlencoded({ extended : false }));
app.use(express.json());


app.post('/login', ControllerSession.login)
app.post('/register', ControllerSession.register)

// AUTH
// ROUTE UNDER THIS NEEDS AUTH
route.use(authentication)