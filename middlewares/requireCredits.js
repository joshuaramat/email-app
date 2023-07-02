module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "Uh oh... It seems you are out of credits. Please refill your credits to continue." });
  }

  next();
};