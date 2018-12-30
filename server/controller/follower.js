import db from '../model';
import loggerW from '../config/loggerWinston';

export async function deleteConnection(req, res, next) {
  try {
    const id = req.params.id;
    const followingId = await db.sequelize.query(
      `DELETE FROM followers 
        WHERE id=:id
        RETURNING followers.following`, 
      { 
        type: db.sequelize.QueryTypes.DELETE,
        replacements: { id }
      }
    ).spread((res, met) => res.following )

    res.status(200).send({
      message: 'You was unfollowed success',
      result: 1,
      id: followingId
    });
    
  } catch(err) {

    loggerW.error(err);
    next(new Error(err.message));
  }

}

export async function createConnection(req, res, next) {
  try {
    const data = req.body;
    const response = await db.sequelize.query(
      `INSERT INTO followers (follower, following)
        VALUES (:follower, :following)
        RETURNING followers.id, followers.following`, 
      { 
        type: db.sequelize.QueryTypes.INSERT,
        replacements: { 
          follower: data.follower,
          following: data.following
        }
      }

    ).spread((res, met) => res[0] )

    res.status(200).send({
      result: 1,
      message: 'You subscribe succesfully!',
      data: response
    });

  } catch(err) {

    loggerW.error(err);
    next(new Error(err.message));
  }

}