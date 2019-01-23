import db from '../model';

export async function deleteConnection(req, res, next) {
  try {

    const followerId = req.user.id;
    const followingId = req.params.id;

    console.log(followingId);
    const response = await db.Follower.destroy({
      where: {
        follower: followerId,
        following: followingId
      }
    });

    res.status(200).send({
      message: 'You succesfully unfollowed user!',
      data: response
    });
    
  } catch(err) {

    next(new Error(err.message));
  }

}


export async function createConnection(req, res, next) {
  try {
    const data = req.body;
    const response = await db.Follower.create({
      follower: data.follower,
      following: data.following,
    });

    res.status(200).send({
      message: 'You subscribed succesfully!',
      data: response
    });

  } catch(err) {
    
    next(new Error(err.message));
  }
}