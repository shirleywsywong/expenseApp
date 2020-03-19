const jwt = require("jsonwebtoken");
const JWT_KEY = "this file is to create a JWT";

exports.createToken = (data) => {
  //.sign takes in data and secret key and encrypt it for you, return a single string 'token'
  const token = jwt.sign(data, JWT_KEY)
  return token;
}

//decrypt the token so you can see who this token belongs to 
exports.decryptToken = async (token) => {
  let user;
  //.verify takes in the encrypted token, the secret key, and return a json 
  await jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      throw err;
    }

    user = decoded;
  });

  //user should look like this {email: newUser.email, id: newUser._id}
  return user;
}