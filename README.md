# jwt-auth
[Node.js](http://nodejs.org/) package for JWT access token authentication.
## Installation

Via git:

```bash
$ git clone https://github.com/Mkrtichh/jwt-auth.git
```
Via [npm](http://npmjs.org/):

```bash
$ npm install @mauth/jwt-auth

```
## Internal database init
```javascript
// Init database with custom  options.
const auth = require('@mauth/jwt-auth');
auth.initDb({
    database: 'db_name',
    username: 'user_name',
    password: "root",
    dialect: 'postgres', // MySql
    host: "localhost",
    port: 5432,
            });

```
## Basic signUp example
```javascript	
// signUp method.
const auth = require('@mauth/jwt-auth');
auth.signUpUser({
     username: 'username',
     email: 'example@gmail.com',
     password: "password"
                }, 
     (err, data) => {}
);
```
## Basic login example
```javascript	
// signUp method.
const auth = require('@mauth/jwt-auth');
auth.login({
     username: 'username' || email: 'example@gmail.com',
     password: "password"
                }, 
     (err, data) => {}
);
```
## Basic authentication example with server
```javascript	
// signUp method.
const auth = require('@mauth/jwt-auth');

app.use(auth.authenticate, someHandler);

```
## Dependencies

 - **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - An implementation of JSON Web Tokens.
 - **[bcrypt.js](https://github.com/dcodeIO/bcrypt.js)** - Optimized bcrypt in plain JavaScript with zero dependencies.
 - **[sequelize.js](http://docs.sequelizejs.com)** - An easy-to-use multi SQL dialect ORM for Node.js.


Copyright (c) Mkrtich Muradyan

