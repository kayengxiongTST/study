const express = require('express');
const cors = require('cors');

const User = require('./models/user');
require('./connections/db.js')

const app = express();
app.use(cors())
app.use(express.json());

app.get('/users', async (req, res) => {
	const user = await User.find({}, { username: 1, name: 1, _id: 1 })
	res.send(user);
});

app.post('/users', async (req, res) => {
	const { name, username, password, phone } = req.body;
	const user = new User({ name, username, password, phone });
	const savedUser = await user.save();
	res.send(savedUser);
});

app.use((req, res) => {
	res.status(400).json({ message: 'Route not found' })
})

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
