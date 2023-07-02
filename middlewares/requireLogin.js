module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "Oops! Your login details don't seem to match our records. Please try again." });
  }

  next();
};