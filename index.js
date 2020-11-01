const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./models/user')
require('./models/surveys')
require('./services/passport')



const app = express()

app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveryRoutes')(app)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    const path = require('path')
    app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

mongoose.connect(keys.mongoURI)
const PORT = process.env.PORT || 5000
app.listen(PORT)

//mongodb+srv://domuz94:<password>@cluster0.dupaq.mongodb.net/<dbname>?retryWrites=true&w=majority