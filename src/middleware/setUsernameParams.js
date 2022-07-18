exports.setUsernameParams = (req, res, next) => {
  try {
    req.username = req.params.username;
    next();
  } catch (error) {
    next(error);
  }
};
