exports.errorHandler = (err, req, res, next) => {
  const error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "서버 내부 에러",
  };

  return res.status(statusCode).json({ error });
};
