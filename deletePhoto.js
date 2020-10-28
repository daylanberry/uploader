const aws = require('aws-sdk');
const express =require('express');
const router = express.Router();
const keys = require('./keys/keys')
require('./awsConfig');


router.delete('/:key', (req, res) => {
  const { key } = req.params

  const s3 = new aws.S3();

  s3.deleteObject({
    Bucket: process.env.S3_BUCKET,
    Key: key
  }, (err, data) => {
    if (err) {
      console.log(err)
    }

    console.log('data', data)

    res.send('data')
  })

})

module.exports = router