const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config()

const s3 = new AWS.S3({
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	Bucket: process.env.BUCKET_NAME
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}
const multerS3Config = multerS3({
	s3: s3,
	bucket: process.env.BUCKET_NAME,
	metadata: function (req, file, cb) {
		cb(null, { fieldName: file.fieldname });
	},
	key: function (req, file, cb) {
		cb(null, new Date().toISOString() + '-' + file.originalname)
	}
});
const upload = multer({
	storage: multerS3Config,
	fileFilter: fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5
	}
})

module.exports = upload