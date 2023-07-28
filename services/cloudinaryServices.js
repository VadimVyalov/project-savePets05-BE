const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const { appError } = require("../utils");

const { CLOUDNERY_API_NAME, CLOUDNERY_API_KEY, CLOUDNERY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDNERY_API_NAME,
  api_key: CLOUDNERY_API_KEY,
  api_secret: CLOUDNERY_API_SECRET,
});

class CloudinaryService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, callBackFunc) => {
      if (!file)
        callBackFunc(appError(400, "Please upload image file..."), false);
      const fileSize =
        parseInt(req.headers["content-length"]) < 3 * 1024 * 1024;

      const fileType = file.mimetype.startsWith("image");
      if (!fileType)
        callBackFunc(appError(400, "Please upload images only..."), false);
      if (!fileSize)
        callBackFunc(appError(400, "Images size must be less 3 Mb ..."), false);

      callBackFunc(null, true);
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...folder) {
    const data = await sharp(file.buffer)
      // .resize(options || { height: 500, width: 500 })
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toBuffer();

    const cloudinaryOptions = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      folder: [...folder].join("/"),
      // transformation: [
      //   {options || { height: 500, width: 500 }
      // ],
    };
    try {
      const dataBase64 = Buffer.from(data).toString("base64");
      const dataURI = `data:image/jpeg;base64,${dataBase64}`;
      const cloudinaryResponse = await cloudinary.uploader.upload(
        dataURI,
        cloudinaryOptions
      );
      //console.log(cloudinaryResponse);
      const { public_id, version, format } = cloudinaryResponse;
      // const baseImgUrl = "https://res.cloudinary.com/dfvviqdic/image/upload/";
      const imgUrl = `v${version}/${public_id}.${format}`;
      // const fullImgUrl = baseImgUrl + imgUrl;
      // console.log(fullImgUrl);
      return imgUrl;
    } catch (err) {
      throw appError(400, "Cloudinary bad response ...");
    }
  }
}

//module.exports = uploadCloud;
module.exports = CloudinaryService;
