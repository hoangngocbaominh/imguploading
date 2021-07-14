const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const cors = require('cors')
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(cors({
  origin: "*"
}))
// app.get("/", (req, res) => res.render("index"));

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      console.log(req.file);
      res.json({
          url: `uploads/${req.file.filename}`
      })
    }
  });
});
const port = 8000;

app.listen(port, () => console.log(`Server start on port ${port}`));
