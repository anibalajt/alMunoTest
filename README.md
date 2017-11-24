# Almundo test

Clonar repo

``` bash
git clone https://github.com/anibalajt/alMunoTest.git
```
instalar dependencies
``` bash
npm install
```

Asignar ip local
``` bash
# ./app/config.js

module.exports = {
  port: process.env.PORT || 3002,
  apiHeroku:'https://almundotest.herokuapp.com/', //conectarse a api en heroku
  apiLocal: 'http://IP LOCAL:3002/',//conectarse a api local
};

# app/request/index.js

line 5:   const url = Config.apiHeroku;
line 6:   const url = Config.apiLocal;

comentar una de las dos lineas para conectarnos a la api local o api en heroku
```
Run
``` bash
react-native run-ios
react-native run-android
```
server local
https://github.com/anibalajt/alMundoServer
