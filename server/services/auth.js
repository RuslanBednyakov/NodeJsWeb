import * as customErrors from '../error'

export function checkAuth(req, res, next){

  if (!req.session.user) {
    return next(new customErrors.HttpError(401, 'Sorry, you are not authorised'));
  }
  
  next();
}