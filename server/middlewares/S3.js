const AWS = require('aws-sdk');

const S3 = new AWS.S3({
  accessKeyId: "AKIAUVD64BU6C3IYAH4D",
  secretAccessKey: "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",
});

module.exports = S3;

// const uploadFileToS3 = async (fileName, fileData) => {
//   const params = {
//     Bucket: "dooee-app", // pass your bucket name
//     ContentType: req.body.fileType,
    // Key: fileName, // file will be saved as testBucket/contacts.csv
    // Body: fileData,
  // };
  // const res = await s3.upload(params, function (s3Err, data) {
  //   if (s3Err) return s3Err;
  //
  //   console.log(`File uploaded successfully at ${data.Location}`)
  //   return  data.Location;
  // });
// };

// const uploadFileToS3 = asyncHandler(async (req, res, next) => {
//   // console.log(req.body)
//   try {
//     if(!req.files) {
//       res.send({
//         status: false,
//         message: 'No file uploaded'
//       });
//     } else {
//       //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//       let avatar = req.files.avatar;
//       // console.log(req.files);
//
//       if (!avatar) {
//         res.status(400).json({error: "The file is required."})
//         return;
//       }
//
//       const params = {
//                 Bucket: 'dooee-app', // pass your bucket name
//                 // ContentType: req.body.fileType,
//                 Key: avatar.name, // file will be saved as testBucket/contacts.csv
//                 Body: avatar.data
//               };
//           s3.upload(params, function(s3Err, data) {
//             if (s3Err) throw s3Err
//
//             console.log(`File uploaded successfully at ${data.Location}`)
//             res.status(200).json({location: data.Location})
//            });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
//
// });

// module.exports = uploadFileToS3;