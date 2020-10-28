const express = require('express');
require('dotenv').config()
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const bodyParser = require('body-parser');
const cors = require('cors')
const addPhoto = require('./editPhotos')
const deletePhoto = require('./deletePhoto');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

// const sign_s3 = require('./editPhotos');


app.use('/api/sign_s3', addPhoto);
app.use('/api/deletePhoto', deletePhoto);


// app.use('/api/deletePhoto/:key', sign_s3.deletePhoto)

app.listen(5000, () => console.log('server is up and running'));

