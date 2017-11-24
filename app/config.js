module.exports = {
  port: process.env.PORT || 3002,
  apiHeroku:'https://almundotest.herokuapp.com/', // api en heroku
  apiLocal: 'http://192.168.5.18:3002/',//cambiar por ip local
  // db: process.env.MONGODB || 'mongodb://localhost:27017/apirest',
  // SECRET_TOKEN: 'miclavedetokens'
};
