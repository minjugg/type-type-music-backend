const admin = require("../config/firebase-server");

const authTokenMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ");

  if (!token) {
    res.status(400).json({ message: "No header received" });
  } else if (!token[1]) {
    res.status(403).json({ message: "No token provided" });
  } else {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token[1]);

      if (decodedToken) {
        return next();
      }

      return res.status(403).json({ message: "Unauthorized user" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = { authTokenMiddleware };
