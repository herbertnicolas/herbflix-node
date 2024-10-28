const Router = require('express').Router;
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./middlewares/auth');
const router = require('./middlewares/auth');
const UserController = require('./app/Controllers/UserController');
require('./mongo').default;
require('dotenv').config();

const routes = new Router();

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome' });
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
routes.post('/register', UserController.store);
routes.put('/update/:id', UserController.put);
app.use(routes);
