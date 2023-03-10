const jwt = require("jsonwebtoken");
const User = require("../models/userModels.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      console.log(token);
      const decoded = jwt.verify(token, "udaya24");
      console.log(decoded.id)
      req.user = await User.findOne({_id: decoded.id})
      console.log(req.user);
      next();
    } catch (error) {
        console.log(error)
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
