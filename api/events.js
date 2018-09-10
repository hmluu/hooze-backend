const express = require('express');

const router = express.Router();
const queries = require('../db/queries');

const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1'
});
const rekognition = new aws.Rekognition();

const s3 = new aws.S3();

router.get('/', (req, res) => {
  queries.getAllEvents().then(events => {
    res.json(events);
  });
});


let upload = multer({
  storage: multers3({
    s3: s3,
    bucket: 'hooze-images',
    contentType: multers3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, 'events/'+ Date.now().toString() + ".jpg")
    }
  })
});

router.post('/', upload.any(), function(req, res, next) {
  const file = req.files[0]
  console.log(file);
  
  let params = {
    CollectionId: "friends",
    FaceMatchThreshold: 95,
    Image: {
      S3Object: {
        Bucket: "hooze-images",
        Name: file.key
      }
    },
    MaxFaces: 5
  }

    rekognition.searchFacesByImage(params, (err, data) => {
      let isFriend = false;
      if(err) {
        return next(err);
      }
      console.log(err);
      console.log(data);
      
      
        if(data.FaceMatches.length > 0) {
          if(data.FaceMatches[0].Face.Confidence > 95) {
            isFriend = true;
          }
        }
        queries
          .insertEvent(
            file.location,
            isFriend,
            new Date()
          ).then(event => {
            res.json(event)
          })
      })
  })



module.exports = router;