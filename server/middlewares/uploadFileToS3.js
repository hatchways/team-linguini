const fs = require('fs');
const AWS = require('aws-sdk');
const formidable = require('formidable')

const s3 = new AWS.S3({
  accessKeyId: 'AKIAUVD64BU6C3IYAH4D',
  secretAccessKey: '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'
});

const uploadFileToS3 = (req, res, next) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      return;
    }
    console.log('Fields', fields)
    console.log('Files', files)
    for (const file of Object.entries(files)) {
      console.log(file)
    }
  })
  return;
  // console.log('ffffffffff', req.body);
  // res.status(200).json({success: true})
  // const file = req.files.file;
  // const path='./middlewares/' +fileName;
  // const buffer = new Buffer(req.body.file);
  const fileName = 'avatar-'+ req.user._id;
  console.log(req)
  if (!req.body.file) {
    res.status(400).json({error: 'there is no file'});
    return;
  }
  try {
    const params = {
          Bucket: 'dooee-app', // pass your bucket name
          // ContentType: req.body.fileType,
          Key: fileName, // file will be saved as testBucket/contacts.csv
          Body: req.body.file
        };
    s3.upload(params, function(s3Err, data) {
      if (s3Err) throw s3Err
      console.log(`File uploaded successfully at ${data.Location}`)
      res.status(200).json({location: data.Location})
    });

  } catch (e) {
    console.log(e)
    res.status(400).json(e.message)
  }
};

module.exports = uploadFileToS3;