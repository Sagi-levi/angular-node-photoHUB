const router = require("express").Router();
const fs = require("fs");
const imageService = require("../services/image_service");

const writeTo = (dirName, data) => {
  fs.writeFile(dirName, data, (err) => {
    if (err) console.log(err);
  });
};

router.get("/", (req, res) => {
  try {
    imageService
      .readFromFile("public/", "premissionsModes.json")
      .then((content) => {
        res.send(content);
      });
  } catch (err) {
    res.send(err);
  }
});
router.post("/changePremissions", async (req, res) => {
  try {
    let newPremissions = JSON.stringify({
      camera: req.body.camera,
      location: req.body.location,
      privateMode: req.body.privateMode
    });
    writeTo('./public/premissionsModes.json', newPremissions);
    res.status(200).json(newPremissions);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
