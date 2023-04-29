const jwt = require("jsonwebtoken");

exports.createPasscode = (exipireTime, ...payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: exipireTime,
  });

  return token;
};
