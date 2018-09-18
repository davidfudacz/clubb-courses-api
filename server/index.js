
const path = require('path')
const express = require('express')
const passport = require('passport')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const { User } = require('./db/models')
const PORT = process.env.PORT || 1908
const socketio = require('socket.io')
const app = express()

module.exports = app

// in development we want to set env variables for secret keys
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  }
  catch (err) {
    done(err)
  }
})

const createApp = () => {
  //logging middleware
  app.use(morgan('dev'))

  //body parser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  //compression
  app.use(compression())

  //session stuff
  app.use(session({
    secret: process.env.SESSION_SECRET || 'second son of a second son of a second son',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  const cors = (req, res, next) => {
    const whitelist = [
      'http://localhost:8080',
    ];
    const origin = req.headers.origin;
    if (whitelist.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  }

  app.use(cors);

  //auth and api
  app.use('/graphql', require('./graphql'))
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  //static files
  app.use(express.static(path.join(__dirname, '..', 'public')))

  //anything else with an file extension gets a 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    }
    else {
      next()
    }
  })

  //everything else hits index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  //handle them errors
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal Server Error')
  })

}

const startListening = () => {
  const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

// if we are running from the command line, do all the things,
// if not, just create App
if (require.main === module) {
  sessionStore.sync()
  .then(syncDb)
  .then(createApp)
  .then(startListening)
}
else {
  createApp()
}
