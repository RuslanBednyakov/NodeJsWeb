import * as customErrors from '../error'

export function checkAuth(req, res, next){
  console.log('checking');
  if (!req.session.user) {
    console.log('sending');
    return next(new customErrors.HttpError(401, 'Sorry, you are not authorised'));
  }
  next();
}