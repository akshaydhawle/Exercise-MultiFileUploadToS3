import * as aws from "aws-sdk";
import * as multer from "multer";
import * as multerS3 from "multer-s3";
import { AWS } from "./config";

aws.config.update({
  region: AWS.REGION,
  accessKeyId: AWS.ACCESS_KEY,
  secretAccessKey: AWS.SECRET_KEY,
});

const s3 = new aws.S3();
const {
  S3: { BUCKET, ENV_FOLDER },
} = AWS;

const generateKey = ({ extension }) =>
  `${ENV_FOLDER}_${Date.now()}.${extension}`;

const storage = multerS3({
  s3,
  bucket: BUCKET,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(
      null,
      generateKey({
        extension: file.originalname.split(".").pop(),
      })
    );
  },
});

const fileFilter = function (req, file, cb) {
  if (
    !["application/pdf", "image/png", "image/jpg", "image/jpeg"].includes(
      file.mimetype
    )
  ) {
    return cb(new Error("Only pdf, jpg, jpeg, png formats are allowed"));
  }
  cb(null, true);
};

export const uploadToS3 = multer({ storage, fileFilter });
