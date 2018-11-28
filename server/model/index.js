import path from "path";
import Sequelize from 'sequelize';;

import config from '../config/config';

const env = process.env.NODE_ENV || "development";
let sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  dialect: config.db.dialect,
  operatorsAliases: false
});;

const db  = {};

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;