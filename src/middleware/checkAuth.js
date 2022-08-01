const admin = require("../config/firebase-server");
const errorMessage = require("../constant/errorMessages");

exports.checkAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ");

    if (!token) {
      throw new Error("notFoundHeader");
    } else if (!token[1]) {
      throw new Error("notFoundToken");
    } else {
      const decodedToken = await admin.auth().verifyIdToken(token[1]);

      if (!decodedToken) {
        throw new Error("unauthorizedUser");
      }

      next();
    }
  } catch (error) {
    next({
      status: errorMessage[error.message]?.status,
      message: errorMessage[error.message]?.message,
    });
  }
};
