const router = require("express").Router();
const fs = require("fs");
const imageService = require("../services/image_service");

const writeTo = (dirName, data) => {
  fs.writeFile(dirName, data, (err) => {
    if (err) console.log(err);
  });
};
router.post("/setPassword", async (req, res) => {
  try {
    let password=JSON.stringify( {password:`${req.body.password}`}) 
    writeTo("./public/user/credentials.json",password);
    res.status(200).json(password);
  } catch (err) {
    res.send(err);
  }
});
router.get("/getPassword", (req, res) => {
    try {
      imageService
        .readFromFile("public/user/", "credentials.json")
        .then((content) => {
          res.send(content);
        });
    } catch (err) {
      res.send(err);
    }
  });
  module.exports = router;
