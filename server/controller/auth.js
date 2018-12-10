import Sequelize from 'sequelize';
import { createPass, comparePass } from '../services/hash';

import db from '../model';

const Op = Sequelize.Op;

export async function signUp(req, res, next){

  const data = req.body;

  try {
    const pass = data.password;
    const hashPass = createPass(pass);
    const user = await db.User.create({
      name: data.name,
      password: hashPass,
      email: data.email
    });
  
    const response = {
      message: 'Sign-up successfully',
      result: 1,
      data: {
        user: {
          // id,
          name: data.name,
          email: data.email
        }
      }
    }
  
    res.status(200).send(response);

  } catch(err) {

    next(new Error(err.message));
  }
}

export function signIn(req, res, next){

  const data = req.body;

  db.User
    .findOne({ where: { email: { [Op.eq]: data.email } } })
    .then(user => {
      if (user !== null && comparePass(user.dataValues, data.password)) {
        req.session.user = user.dataValues.id;
        res.status(200).send({
          result: 1,
          data: {
            user: {
              user_id: user.id,
              name: user.name,
              email: user.email
            }
          },
          message: 'Sign-in successfully.'
        })
      } else  {
        res.status(401).send({
          result: 2,
          message: 'Login or password is incorrect.'
        })
      }
    })
    .catch(err => { 
      throw new Error(err.message)
    })
}

export function logOut(req, res, next){
  req.session.destroy();
  res.status(200).send({
    message: 'OK'
  })
}