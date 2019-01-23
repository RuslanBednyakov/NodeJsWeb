import Sequelize from 'sequelize';
import db from '../model';

const Op = Sequelize.Op;

export function getUsersByName(req, res, next){

  const data = req.body;
  let userId = null;

  if(req.user) {

    userId = req.user.id;
  }

  db.User
    .findAndCountAll({ 
      attributes: { exclude: ['password'] },
      where: { 
        name: { [Op.iLike]: `%${data.name}%`},
        id: {[Op.ne]: userId}
      },
      include: [{
        model: db.User,
        as: 'userFollowing',
        attributes: { exclude: ['password'] },
        through: {
          where: { follower: userId}
        }
      }] 
    })
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