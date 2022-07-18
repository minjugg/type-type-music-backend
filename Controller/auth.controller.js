exports.login = (req, res, next) => {
  try {
    return res.json({ message: "성공적으로 로그인 되었습니다." });
  } catch (error) {
    next(error);
  }
};
