const router = require("express").Router();
const fs = require("fs");
const credentialsPassword = require("../public/user/credentials.json").password;

router.post("/login", async (req, res) => {
  try {
    const dbpassword = credentialsPassword;
    const uiPassword = req.body.password; //password from user

    if (dbpassword !== uiPassword) {
      //wrong password
      res.status(200).json("wrong password");
    } else {
      //true password
      let secretModeTrue = { secretMode: "true" };
      secretModeChange(secretModeTrue);
      res.status(200).json("great"); //return feedback to user
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    let secretModeFalse = { secretMode: "false" };
    secretModeChange(secretModeFalse);
    res.status(200).json("great"); //return feedback to user
  } catch(err) {
    res.status(500).json(err);
  }
});

const secretModeChange = (stat) => {
  let data = JSON.stringify(stat);
  fs.writeFile("./public/user/secretMode.json", data, (err) => {
    if (err) console.log(err);
  });
};

module.exports = router;
