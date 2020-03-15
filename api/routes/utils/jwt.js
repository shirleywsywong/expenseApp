const jwt = require("jsonwebtoken");
const JWT_KEY = "this file is to create a JWT";

exports.createToken = (data) => {
  //.sign takes in data and secret key and encrypt it for you, return a single string 'token'
  const token = jwt.sign(data, JWT_KEY)
  return token;
}