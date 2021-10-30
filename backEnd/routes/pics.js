const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const imageService = require("../services/image_service");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public/images/ImageSrc");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const writeTo = (dirName, data) => {
  fs.writeFile(dirName, data, (err) => {
    if (err) console.log(err);
  });
};

router.post("/UploadPicJson", async (req, res) => {
  try {
    let picData = JSON.stringify({
      src: `${req.body.src}`,
      caption: `${req.body.caption}`,
      categories: `${req.body.categories}`,
      location: `${req.body.location}`,
      favorite: `${req.body.favorite}`,
      privateMode: `${req.body.privateMode}`,
    });
    writeTo(`./public/images/imageJson/${req.body.name}.json`, picData);
    res.status(200).json(picData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/UploadPicSrc", upload.single("file"), (req, res) => {
  //uplaod the src pic
  const file = req.file;
  if (!file) {
    const error = new Error("No File");
    res.status(400).json(error);
  }
  res.status(200).json(file);
});

router.post("/getAllPics", async (req, res) => {
  //get all pics by filter favorite private
  try {
    imageService
    .readAllFiles(req.body.isFav, req.body.isPrivate)
    .then((data) => {
      res.send(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
