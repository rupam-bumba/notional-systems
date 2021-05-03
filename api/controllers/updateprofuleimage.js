const userDB = require("../models/user");
var multer = require("multer");
var path = require("path");
const fs = require("fs");

// storage eng
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "././public/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check File Type AND File Filter
var fileFilter = (req, file, cb) => {
  console.log("[DEBUG 2.1]\t" + file.mimetype);

  const fileExtensionType = /jpeg|doc|png|jpg/; // Allowed ext
  const fileMimeType = /jpeg|jpg|png/;
  const extname = fileExtensionType.test(
    path.extname(file.originalname).toLowerCase()
  ); // Check ext
  const mimetype = fileMimeType.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(null, false, new Error("image file only jpeg png jpg"));
  }
};

// Init Upload
var upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: fileFilter,
}).single("updateprofileimage");

exports.put_updateprofuleimage = (req, res, next) => {
  upload(req, res, (err) => {
    console.log(req.body);
    console.log(JSON.stringify(req.file));
    console.log(JSON.stringify(req.body));

    if (err instanceof multer.MulterError) {
      res.status(400).json({
        err,
      });
    } else if (req.file === undefined) {
      console.log("Error: No File Selected!");
      const err = new Error("No File Selected!");
      return next(err);
    } else if (err) {
      console.log(err);
      res.status(400).json({
        err,
      });
    } else {
      userDB
        .find({ _id: req.body._id })
        .then((result) => {
          console.log(result);
          const filename = result[0].profile_image[0].file_location;

          try {
            fs.unlinkSync("././public/" + filename);

            userDB
              .updateOne({ _id: req.body._id } ,   {
                $set: { "profile_image.0.file_location"  : req.file.filename } 
               })
              .then((resp) => {
                res.status(400).json({
                  resp
                });
              })
              .catch((eerr) => {
                console.log(eerr);
                res.status(400).json({
                  eerr
                });
              });
          } catch (err) {
            console.error(err);
          }

      
        })
        .catch((error) => {
          res.status(400).json({
            error,
          });
        });
    }
  });
};
