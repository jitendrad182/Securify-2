var fs = require("fs");
var path = require("path");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/middleware");
const User = require("../models/user_model");

router.get("/", (Req, res) => {
  res.render("index");
});

router.get("/login", (Req, res) => {
  const { spawn } = require("child_process");
  const pyProg = spawn("python", [
    path.join(__dirname, "..", "public", "face", "test", "index.py"),
  ]);

  pyProg.stdout.on("data", function (data) {
    console.log(data.toString());
    res.write(data);
    res.end("end");
  });
  // res.render("login");
});

router.get("/profile", (Req, res) => {
  res.render("profile");
});

router.get("/registeration", (req, res) => {
  res.render("registeration");
});

router.post("/registeration", upload.single("image"), (req, res) => {
  console.log(req.body);
  var obj = {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    mobileNumber: req.body.phoneNumber,
    password: req.body.password,
    gender: req.body.gender,
    img: {
      data: fs.readFileSync(
        path.join(
          __dirname,
          "..",
          "public",
          "face",
          "images",
          req.file.filename
        )
      ),
      contentType: "image/png",
    },
  };

  User.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
  console.log(obj);
});

module.exports = router;
