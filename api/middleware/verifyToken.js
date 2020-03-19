//first, decrypt the token so we know who this user is - write this in the same file as where you encrypt it
const { decryptToken } = require("../routes/utils/jwt");

//normally authorization tokens are sent through headers {authorization: 'Bearer tokenString'}
exports.verifyToken = async (req, res, next) => {
  const { headers } = req;

  //if headers do not contain authorization field, return an error
  try {
    if (!headers.authorization) {
      res.status(403).json({ message: 'authorization required ' });
      return;
    }

    //from the authorization object, only want the 2nd word (tokenString)
    const token = headers.authorization.split(' ')[1];

    //ATTEMPT to decrypt the tokenString using the jwt decrypting
    //user is {email: newUser.email, id: newUser._id}
    const user = await decryptToken(token)

    //assign a user field to the request object for all other subsequent actions
    req.user = user;

    //go back to expenseRoutes and do the next thing
    next();
  } catch (err) {

    //if token is invalid, error will be here 
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

//instead of writing this same function in userRoutes and notesRoutes, have it live as middleware so we can access it everywhere by using app.use() function