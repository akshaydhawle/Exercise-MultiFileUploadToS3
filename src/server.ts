import * as express from "express";
import { connect } from "mongoose";

import { uploadToS3 } from "./fileUpload";
import { imagesModel, IImage } from "./imageModel";

const app = express();

// get the port no
const PORT = process.env.PORT || 3000;

// database connection
connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((_) => console.log(" connected to db"))
  .catch((err) => console.log("err occured.", err));

// listen to server
app.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}`)
);

// parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// upload file to s3
app.post(
  "/api/uploadFiles",
  uploadToS3.fields([
    { name: "images", maxCount: 4 },
    { name: "photos", maxCount: 4 },
  ]),
  async (req: any, res, next) => {
    try {
      const images: [] = req.files.images.map((image) => image.location);
      const photos: [] = req.files.photos.map((image) => image.location);

      req.body.images = images;
      req.body.photos = photos;

      const data: IImage = req.body;

      await new imagesModel(data).save();

      res.send({ files: req.files });
    } catch (error) {
      res.status(500).send(`internal server error ${error}`);
    }
  }
);
