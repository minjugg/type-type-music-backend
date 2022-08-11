exports.login = (req, res, next) => {
  try {
    const token = req?.headers["authorization"].split(" ")[1];

    res.json({ message: "success" });

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
