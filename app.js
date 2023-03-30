const express = require('express');
const cors = require('cors');
const upload = require('./multer/s3');

const app = express();
app.use(cors())
app.use(express.json());

app.post('/upload', upload.single('img'), async (req, res) => {
	res.send(req.file)
});

app.use((req, res) => {
	res.status(400).json({ message: 'Route not found' })
})

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
