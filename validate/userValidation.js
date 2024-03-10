export const registerValidation = async (req, res, next) => {
  if (!req.body.username) throw new Error("username is required");
  if (!req.body.email) throw new Error("email is required");
  if (!req.body.password) throw new Error("password is required");
  next();
};
