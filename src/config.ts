export const AWS = {
  REGION: process.env.region,
  ACCESS_KEY: process.env.access_key,
  SECRET_KEY: process.env.secret_key,
  S3: { BUCKET: process.env.bucket, ENV_FOLDER: process.env.folder },
};
