const express = require('express');
const User = require('../app/schemas/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res
            .status(400)
            .send({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User
            .findOne({ username })
            .exec();
        if (!user) {
            return res
                .status(400)
                .send({ message: 'The username does not exist' });
        }
        const valid = await user.comparePassword(password);
        if (!valid) {
            return res
                .status(400)
                .send({ message: 'The password is not correct' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.status(200).send({ token });
    } catch (error) {
        res
            .status(400)
            .send({ message: 'Error logging in', error });
    }
});

module.exports = router;