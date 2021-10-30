const fs = require("fs");

const readFromFile = (dirname, filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dirname + filename, "utf-8", function (err, content) {
      if (err) {
        return console.log(err);
      }
      let contentJson = JSON.parse(content);
      resolve(contentJson);
    });
  });
};

const readAllFiles = async (isFav, isPrivate) => {
  return new Promise((res, rej) => {
    let data = [{}];
    fs.readdir("public/images/imageJson/", async (err, files) => {
      const filesCount = files.length;
      let count = 0;
      files.forEach(async (file) => {
        const content = await readFromFile(
          "public/images/imageJson/",
          `${file}`
        );
        if (isFav=== "false" && isPrivate=== "false") {
          if (content.favorite === "false" && content.privateMode === "false")
            data[count] = content;
        }
        else if(isFav=== "false" && isPrivate){
          if (content.favorite === "false" && content.privateMode === "true")
            data[count] = content;
            if (content.favorite === "false" && content.privateMode === "false")
            data[count] = content;
        }
        else if(isFav && isPrivate=== "false"){
          if (content.favorite === "true" && content.privateMode === "false")
          data[count] = content;
          if (content.favorite === "false" && content.privateMode === "false")
          data[count] = content;
        }
        else if (isFav && isPrivate) {
            data[count] = content;
        }

        count++;
        if (count == filesCount) {
          res(data);
        }
      });
      count = 0;
    });
  });
};
module.exports = {
  readAllFiles,
  readFromFile,
};
