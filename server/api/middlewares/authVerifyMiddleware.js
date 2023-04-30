const jwt = require("jsonwebtoken");

exports.authVerifyMiddleware = (req, res, next) => {
  let token = req.header("Authorization").split(" ")[1];
  console.log("🔑 Token: ", token);
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      console.log(err);
      res.status(403).json({
        message: "token failed",
      });
    }
  } else {
    res.status(401).json({
      message: "token not found",
    });
  }
};
