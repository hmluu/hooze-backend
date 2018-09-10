require('dotenv').config()
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1'
});

const rekognition = new aws.Rekognition();

function addPic(file) {
  let params = {
    CollectionId: "friends",
    DetectionAttributes: ["ALL"],
    Image: {
      S3Object: {
        Bucket: "hooze-images",
        Name: file.key
      }
    }
  }
  return new Promise((resolve, reject) => {
    rekognition.indexFaces(params, (err, data) => {
      if(err) {
        reject(err);
      } else resolve(data);
      })
  })
}



module.exports = addPic;