const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const User = require('./models/user');
require('./connections/db.js')

const s3 = new AWS.S3({
	accessKeyId: '',
	secretAccessKey: '',
	Bucket: ''
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
	bucket: 'learn-s3-mongo',
	metadata: function (req, file, cb) {
		cb(null, { fieldName: file.fieldname });
	},
	key: function (req, file, cb) {
		console.log(file)
		cb(null, new Date().toISOString() + '-' + file.originalname)
	}
});
const upload = multer({
	storage: multerS3Config,
	fileFilter: fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
	}
})

const app = express();
app.use(cors())
app.use(express.json());

app.get('/users', async (req, res) => {
	const user = await User.find({}, { username: 1, name: 1, _id: 1 })
	res.send(user);
});

app.post('/users', upload.single('img'), async (req, res) => {
	// const { name, username, password, phone } = req.body;
	// const user = new User({ name, username, password, phone });
	// const savedUser = await user.save();
	// res.send(savedUser);
	res.send("Done")
});

app.use((req, res) => {
	res.status(400).json({ message: 'Route not found' })
})

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
