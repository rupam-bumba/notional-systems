const express = require("express");
const router = express.Router();


// POST insertuser
const insertuser = require("../controllers/insertuser");
router.post("/insertuser", insertuser.post_insertuser);

// PUT updateuser
const updateuser = require("../controllers/updateuser");
router.put("/updateuser", updateuser.put_updateuser);

// GET updateuser
const fetchuser = require("../controllers/fetchuser");
router.get("/fetchuser", fetchuser.get_fetchuser);

module.exports = router;