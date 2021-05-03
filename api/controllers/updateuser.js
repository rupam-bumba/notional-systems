const userDB = require("../models/user");


exports.put_updateuser = (req,res,next) =>{

    userDB.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number, 
            password: req.body.password,
          },
        },
        { runValidators: true }
      )
      .then((result) => {
        res.status(200).json({
          result,
        });
      })
      .catch((error) => {
        return next(error);
      });

}