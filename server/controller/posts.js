import Sequelize from 'sequelize';
import db from '../model';

const Op = Sequelize.Op;

export async function getPostsByUserId(req, res, next){

  try {
    const id = req.params.id;
    console.log(id);
    const response = await db.Post.findAll({
      where: { user_id: id }
    });

    res.status(200).send(response);

  } catch(err) {
    
    next(new Error(err.message));
  }

}

export async function getPostsFriends(req, res, next) {

  const id = '11';

  // db.User
  //   .findAll({
  //       where: {
  //         '$userFollowing.id$': id
  //       },
  //         include: [{
  //           model: db.User,
  //           as: 'userFollowing',
  //           through: {
  //             where: { follower: id}
  //           }
  //         }],
  //   })
  // .then(users => {
  // console.log(JSON.stringify(users))})

  db.Post
    .findAll({
      where: { '$User.userFollowing.id$': id },
      include: [{
          model: db.User,
          include: [{
            model: db.User,
            as: 'userFollowing',
            through: {
              where: { follower: id}
            }
          }]
      }]
    })
    .then(posts => {
      const filteredPosts = posts.forEach(element => {
        delete element.User.password;
        delete element.User.userFollowing.password;
      }); 
      return filteredPosts
    })
    .then(filteredPosts => {
    console.log(JSON.stringify(filteredPosts))})
 
  //   .then(users => {
  //     if (users !== null) {
  //       users.forEach(element => {
  //         delete element.password;
  //       });
  //       res.status(200).send({
  //         result: 1,
  //         data: users,
  //         message: 'Search successfull'
  //       })
  //     } else  {
  //       res.send({
  //         result: 2,
  //         message: 'No results'
  //       })
  //     }
  //   })
  //   .catch(err => { 
  //     throw new Error(err.message)
  //   })
    // const response = await db.sequelize.query(
    //   `SELECT * FROM posts RIGHT JOIN users ON posts.user_id=users.id WHERE
    //   user_id IN (SELECT following FROM followers WHERE follower=:id);`, 
    //   { 
    //     type: db.sequelize.QueryTypes.SELECT,
    //     replacements: { id }
    //   }
    // )
    
    // res.status(200).send(response);
    
  // } catch (err) {

  //   loggerW.error(err);
  //   next(new Error(err.message));
  // }
}

export async function createNewPost(req, res, next) {
  try {
    const data = req.body;
    const response = await db.Post.create({
      user_id: data.user_id,
      title: data.title,
      content: data.content,
      date: data.date 
    });

    res.status(201).send(response);

  } catch(err) {
    
    next(new Error(err.message));
  }
}