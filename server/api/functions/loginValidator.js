//Login Validator Function
const loginValidator = (req, res, next) => {
    console.log("📑 Login Form Data (Login Validator): \n", req.body);
    next();
}


