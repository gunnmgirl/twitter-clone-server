import User from "../models/userModel";

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("A user with this email could not be found!");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).send(user);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default { getUser };
