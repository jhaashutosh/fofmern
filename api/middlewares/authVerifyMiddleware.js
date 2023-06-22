const jwt = require("jsonwebtoken");

exports.authVerifyMiddleware = (req, res, next) => {
    // let token = req.header("Authorization");
    // if (token) token = token.split(" ")[1];

    const token = req.cookies.jwtToken;
    console.log("🔑 Token: ", token);

    if (token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        } catch (err) {
            console.log("Error! Decoding JWT Token:", err);
            res.status(403).json({ message: "token failed" });
        }
    } else {
        res.status(401).json({ message: "Token Not Found!" });
    }
};
