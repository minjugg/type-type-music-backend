exports.setUserIdParams = (req, res, next) => {
  try {
    req.userId = req.params.userId;
    next();
  } catch (error) {
    next(error);
  }
};
