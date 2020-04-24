const User = require("../models/Users");
const asyncHandler = require("../middlewares/asyncHandler");
const S3 = require("../middlewares/S3");

//@Desc update the user on on selectedBoards, boards, avatarUrl
//@Route PUT /api/v1/user/update
//@Access private
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return next(new ErrorResponse("Invalid User Id", 404));
  }
  const newData = {};
  //Limit for the fields could be update
  ["selectedBoard", "boards", "avatarUrl"].forEach((field) => {
    const value = req.body[field];
    if (value) newData[field] = value;
  });
  user = await User.findByIdAndUpdate(req.user._id, newData, { new: true });
  console.log("theuser on update", user);
  userData = await User.findById(req.user._id);
  res.status(200).json(userData);
});

//@desc upload image file and save it to S3
//@route POST /api/v1/users/uploadAvatar
//@access private
exports.uploadAvatar = async (req, res, next) => {
  try {
    let avatar = req.files.avatar;
    // console.log(req.files);

    if (!avatar) {
      res.status(400).json({ error: "The file is required." });
      return;
    }

    //Upload to S3 server
    const fileName = req.user._id + "-" + avatar.name;
    const params = {
      Bucket: "dooee-app", // pass your bucket name
      Key: fileName, // file will be saved as testBucket/contacts.csv
      Body: avatar.data,
    };
    S3.upload(params, function (s3Err, data) {
      if (s3Err) {
        console.log(s3Err);
        res.status(500).json({ error: "Server Error." });
        return;
      }

      console.log(`File uploaded successfully at ${data.Location}`);
      const updateToUser = async (url) => {
        const user = await User.findById(req.user._id);
        user.avatarUrl = url;
        user.save();
      };
      updateToUser(data.Location);
      res.status(200).json({ avatarUrl: data.Location });
    });
  } catch (e) {
    res.status(500).json({ error: "Server Error." });
  }
};
