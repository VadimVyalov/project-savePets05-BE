const multer = require("multer");
const path = require("path");
const fse = require("fs-extra");
const sharp = require("sharp");
const { v4 } = require("uuid");

class ImageService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (_, file, callBackFunc) => {
      if (file.mimetype.startsWith("image")) {
        callBackFunc(null, true);
      } else {
        callBackFunc(appError(400, "Please upload images only..."), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {
    const fileName = `${v4()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);
    console.log(file);
    await fse.ensureDir(fullFilePath);
    await sharp(file.buffer)
      .resize(options || { height: 500, width: 500 })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;
