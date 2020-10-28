const aws = require('aws-sdk');
const keys = require('./keys/keys');
const express = require('express');
require('./awsConfig')

const router = express.Router();
const S3_BUCKET = process.env.S3_BUCKET;

router.post('/addPhoto', (req, res) => {
  const { fileName, fileType } = req.body;

  const s3 = new aws.S3();

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err)

      res.send({ success: false, error: err})
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`

    }
    res.send({ data: { returnData }})

  })
});


module.exports = router
