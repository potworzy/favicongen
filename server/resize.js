const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

class Resize {
  constructor(folder, sizeX, sizeY, name="img", type = "png") {
    this.folder = folder;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.name = name;
    this.type = type;
  }
  async save(buffer) {
    const filename = Resize.filename(this.name, this.type);
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(this.sizeX, this.sizeY, {
        fit: sharp.fit.fill,
        withoutEnlargement: false
      })
      .toFile(filepath);
      
      return filename;
  }
  static filename(name, type) {
    console.log("file name", `${name}.${type}`);
    return `${name}.${type}`
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}

module.exports = Resize;