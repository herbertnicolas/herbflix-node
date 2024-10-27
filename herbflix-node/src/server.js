const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
require('./mongo');

const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome' });
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});

// app.use(bodyParser.json());
// app.use('/auth', authRoutes);
