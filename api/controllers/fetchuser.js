const userDB = require("../models/user");

exports.get_fetchuser = (req, res, next) => {
  userDB
    .find({})
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
