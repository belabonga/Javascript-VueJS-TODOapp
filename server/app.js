if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else if (process.env.NODE_ENV === 'production') {
    // TO CLEAR CONSOLE LOGS BEFORE DEPLOYING
    console.log = function () {};
}

const cors      = require('cos')
    , express   = require('express')
    , app       = express()
    , router    = require('./routers/index');

app.use(cors());
app.use(express.urlencoded({ extended : false }));
app.use(express.json());

// AUTH
// ROUTE UNDER THIS NEEDS AUTH
route.use('/', router)

