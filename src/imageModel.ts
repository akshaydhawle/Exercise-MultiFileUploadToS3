import * as mongoose from "mongoose";

export const imagesModel = mongoose.model(
  "images",
  new mongoose.Schema(
    {
      images: [],
      photos: [],
    },
    {
      timestamps: true,
    }
  )
);

export interface IImage {
  _id?: String;
  images: [];
  photos: [];
}
