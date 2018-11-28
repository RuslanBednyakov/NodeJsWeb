# NodeJs Web

<div><strong><h4>Note:</h4></strong> This is a NodeJs application </div>

## Getting started

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server
-  Go to http://localhost:4000

# Main stack #

* [node.js](http://nodejs.org)
* [express](http://expressjs.com)
* [Passport](http://passportjs.org) and [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/)
* [sequelize](http://docs.sequelizejs.com/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

For database is used postgresql.
 
## Functionality overview

The example application is a social blogging site.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- GET and display posts of friends
- Create posts
- Follow other users
