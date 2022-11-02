if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else if (process.env.NODE_ENV === 'production') {
    // TO CLEAR CONSOLE LOGS BEFORE DEPLOYING
    console.log = function () {};
}

const cors      = require('cors')
    , express   = require('express')
    , app       = express()
    , router    = require('./routers/');

app.use(cors());
app.use(express.urlencoded({ extended : false }));
app.use(express.json());

// AUTH
// ROUTE UNDER THIS NEEDS AUTH
app.use('/', router)

module.exports = app