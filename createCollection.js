require('dotenv').config()
const aws = require('aws-sdk');
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1'
});
const rekognition = new aws.Rekognition();

function createCollection () {
  let params = {
    CollectionId: "friends"
   };
   rekognition.createCollection(params, function(err, data) {
     if (err) console.log(err, err.stack); 
     else     console.log(data);           
     
   });
}



createCollection();