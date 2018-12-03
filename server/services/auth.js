export function checkAuth(req, res, next){
  if (!req.session.user) {
    return next(err);
  }
  next();
}