const router = require("express").Router();
const fs = require("fs");
const imageService = require("../services/image_service");

const writeTo = (dirName, data) => {
  fs.writeFile(dirName, data, (err) => {
    if (err) console.log(err);
  });
};

router.get("/getAllCategoreis", async (req, res) => {
  try {
    imageService.readFromFile("public/", "categories.json").then((content) => {
      res.send(content);
    });
  } catch (err) {
    res.send(err);
  }
});
router.post("/addCategory", async (req, res) => {
  try {
    imageService.readFromFile("public/", "categories.json").then((content) => {
      let arr = [];
      content.forEach((element) => {
        arr.push(element);
      });
      arr.push({name:req.body.newCategory,value:req.body.newCategory});
      writeTo(`./public/categories.json`, JSON.stringify(arr));
      res.send(arr);
    });
  } catch (err) {
    res.send(err);
  }
});
router.post("/removeCategory", async (req, res) => {
  try {
    imageService.readFromFile("public/", "categories.json").then((content) => {
      let arr = [];
      content.forEach((element) => {
          if(element.name!==`${req.body.toRemoveCategory}`)
        arr.push(element);
      });
      writeTo(`./public/categories.json`, JSON.stringify(arr));
      res.send(arr);
    });
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
