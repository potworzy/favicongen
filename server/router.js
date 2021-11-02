const express = require('express');
const app = express();
const router = express.Router();
const upload = require('./upload');
const Resize = require('./Resize');
const path = require('path');
const md5 = require('md5');
const fs = require("fs");
const fileXml = "browserconfig.xml";
const fileWebmanifest = "site.webmanifest";

router.post('/post', upload.single('image'), async function(req, res) {
  if(!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  ///CREATE UNIQUE DIRECTORY
  const pathString = `./public/images/${md5(req.file.buffer)}`;
  fs.mkdir(path.join(__dirname, `${pathString}`), (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created!');
});

const copyFileCallback = (err) => {
  if (err) throw err;
  else {
    flag++;
  }
}
///COPY STATIC FILES
  const copyFiles = (myPath,name) => {
    console.log(`./${name}`, `${myPath}/${name}`);
    fs.copyFile(path.resolve(__dirname,`./${name}`), `${myPath}/${name}`,(err) => {
      if(err) { console.log("ERROR! ",err)}
      else console.log("OK");
    });
  }
  const imagePath = path.join(__dirname, `${pathString}`);
  ///RESIZE AND SAVE FILES ON UNIQUE DIRECTORY
  const file1 = new Resize(imagePath, 192, 192, "android-chrome-192x192");
  const filename1 = await file1.save(req.file.buffer);
  const file2 = new Resize(imagePath, 512, 512, "android-chrome-512x512");
  const filename2 = await file2.save(req.file.buffer);
  const file3 = new Resize(imagePath, 16, 16, "favicon-16x16");
  const filename3 = await file3.save(req.file.buffer);
  const file4 = new Resize(imagePath, 32, 32, "favicon-32x32");
  const filename4 = await file4.save(req.file.buffer);
  ///COPY STATIC FILES
  const f1 = copyFiles(imagePath,fileXml);
  const f2 = copyFiles(imagePath,fileWebmanifest);
  //return res.status(200).json({name: filename4});
})

module.exports = router;