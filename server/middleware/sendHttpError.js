module.exports = function (req, res, next) {
  console.log('middle error');
  res.sendHttpError = function(error) {
    console.log('render');
    res.status(error.status);
    console.log(error);
    res.render('errorHttp', {error: error.message});
  };
  next();
}