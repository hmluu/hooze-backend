const express = require('express');
const addToCollection = require('../addToCollection');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');


aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1'
});

const s3 = new aws.S3();

let upload = multer({
  storage: multers3({
    s3: s3,
    bucket: 'hooze-images',
    contentType: multers3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      console.log(file);

      cb(null, 'friends/' + Date.now().toString() + "-" + file.originalname)
    }
  })
});

const queries = require('../db/queries');

function isValidID(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'))
}

function validFriend(friend) {
  const hasName = typeof friend.name == 'string' && friend.name.trim() != '';
  const hasRelation = typeof friend.relation == 'string' && friend.relation.trim() != '';
  return hasName && hasRelation;
}

function validImage(file) {
  let image = file.type.split('/').pop().toLowerCase();
  if (image != "jpeg" && image != "jpg" && image != "png" && image != "bmp") {
    alert('Please upload a valig image file');
  }
  if (file.size > 1024000) {
    alert('Max upload size if 1MB only');
  }
  return image;
}
router.get('/', (req, res) => {
  queries.getAll().then(friends => {
    res.json(friends);
  });
});

router.get('/:id', isValidID, (req, res, next) => {
  queries.getOne(req.params.id).then(friend => {
    if (friend) {
      res.json(friend);
    } else {
      next();
    }
  });
});

router.get('/:id/pics', isValidID, (req, res, next) => {
  queries.getAllImages(req.params.id)
    .then(result => {
      res.json(result);
    })
})
router.post('/', (req, res, next) => {
  if (validFriend(req.body)) {
    queries.create(req.body).then(friends => {
      res.json(friends[0]);
    });
  } else {
    next(new Error('Invalid Image'));
  }
});

router.post('/:id/pics', upload.any(), function (req, res, next) {
  console.log("we are here");
  
  addToCollection(req.files[0])

    .then(result => {
      console.log(result);
      
      let ids = []
      for (i = 0; i < result.FaceRecords.length; i++) {
        let face = result.FaceRecords[i]
        let eachId = face.Face.FaceId;
        ids.push(eachId);
      }
      let face_ids = ids.join(',')
      console.log(face_ids);
      
      queries
        .insertPic(req.params.id, req.files[0].location, face_ids)
        .then(result => {
          console.log(result);
          res.json(result[0])
        });
    })
})


router.put('/:id', isValidID, (req, res, next) => {
  if (validFriend(req.body)) {
    queries.update(req.params.id, req.body).then(friends => {
      res.json(friends[0]);
    });
  } else {
    next(new Error('Invalid Friend'));
  }
});

router.delete('/:id', isValidID, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;