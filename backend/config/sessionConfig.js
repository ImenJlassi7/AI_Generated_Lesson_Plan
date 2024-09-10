const MongoStore = require('connect-mongo');
require('dotenv').config();

module.exports = {
  secret: '646b0abf07fe183cbc3c6548bab65cb98aba3a988b1b7c9d846e0179cb5265a53b4bbaadd9e5042776ce38d9e471ce49a6f08d81d4e8449c5de27423d1a5554d',
  resave: false,               // Don't save session if unmodified
  saveUninitialized: false,    // Don't create session until something is stored
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://Imen77:lBMe4mmUcSxjcP9a@cluster0.qqi6fog.mongodb.net/lessonPlansDB?retryWrites=true&w=majority' ,
    ttl: 14 * 24 * 60 * 60 // Session expiration (optional)
  }),
  cookie: {
    secure: false,             // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
};
