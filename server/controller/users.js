import Sequelize from 'sequelize';
import db from '../model';

const Op = Sequelize.Op;

export function getUsersByName(req, res, next){

  const data = req.body;

  db.User
    .findAndCountAll({ where: { name: { [Op.eq]: data.name } } })
    .then(users => {
      if (users !== null) {
        res.status(200).send({
          result: 1,
          data: users,
          message: 'Search successfull'
        })
      } else  {
        res.send({
          result: 2,
          message: 'No results'
        })
      }
    })
    .catch(err => { 
      throw new Error(err.message)
    })
}