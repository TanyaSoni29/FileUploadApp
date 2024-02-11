const express = require("express");
const router = express.Router();

const {imageUpload, videoUpload, imageReducerUpload, localfileUpload } = require("../controllers/fileControllers")

router.post("/imageUpload", imageUpload);
router.post("/localfileUpload", localfileUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducerUpload", imageReducerUpload);

module.exports = router;