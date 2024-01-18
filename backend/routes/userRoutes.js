// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Emission = require('../models/emission');
const Response = require('../models/response');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findAll({ where: { id: id }, order: [['createdAt', 'DESC']] });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ where: { userId: userId }, order: [['createdAt', 'DESC']] });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/temporary/:tempId', async (req, res) => {
    try {
        const tempId = req.params.tempId;
        const user = await User.findOne({ where: { tempId: tempId }, order: [['createdAt', 'DESC']] });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/signup', async (req, res) => {
    const { name, email, password, tempId } = req.body;
    console.log("TEST name, email, password, tempId: ", name, email, password, tempId);

    try {
        // Ensure that the user doesn't already exist
       /*  const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        } */
        // const newUser = await User.create(req.body);
/*         const lastUser = await User.find().sort({ userId: -1 }).limit(1);
        const nextUserId = lastUser.length === 0 ? 1 : lastUser[0].userId + 1;
        const newUser = await User.create({ userId: nextUserId, name, email, password }); */

        /* const lastUser = await User.findAll({ order: [['userId', 'DESC']] });
        const nextUserId = lastUser ? lastUser.userId + 1 : 1;
        const newUser = await User.create({ userId: nextUserId, name, email, password }); */

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log("TEST hashedPassword: ", hashedPassword);
        // const newUser = await User.create({ name, email, password });
        const newUser = await User.create({ name, email, password: hashedPassword, tempId });
        if (tempId) {
            // Update emissions associated with the tempId
            await Emission.update({ userId: newUser.userId }, { where: { tempId: tempId } });
            await Response.update({ userId: newUser.userId }, { where: { tempId: tempId } });
        }
        // res.status(201).json(newUser);
        res.status(201).json({ userId: newUser.userId, name: newUser.name, email: newUser.email, tempId: newUser.tempId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password, tempId } = req.body;
    console.log("TEST email, password, tempId from backend: ", email, password, tempId);

    /* try {
        console.log('TEST Email:', email);
        const user = await User.findOne({ where: { email: email }});
        if (user && user.password === password) { 
        //   res.status(200).send({ message: 'Login successful', user: {name: user.name, email: user.email} });
            res.status(200).send({ userId: user.userId, name: user.name, email: user.email, password: user.password } );
        } else {
          res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    } */

    try {
        const user = await User.findOne({ where: { email: email } });
        
        if (user) {
            // Compare the provided password with the hashed password in the database
            if (user.password.startsWith("$2b$")) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    if (tempId) {
                        // Update emissions associated with the tempId
                        await Emission.update({ userId: user.userId }, { where: { tempId: tempId } });
                        await Response.update({ userId: user.userId }, { where: { tempId: tempId } });
                    }
                    res.status(200).send({ userId: user.userId, name: user.name, email: user.email, tempId: user.tempId });
                } else {
                    // Passwords do not match
                    res.status(401).send({ message: 'Invalid credentials' });
                }
            } else {
                if (user && user.password === password) { 
                    if (tempId) {
                        // Update emissions associated with the tempId
                        await Emission.update({ userId: user.userId }, { where: { tempId: tempId } });
                        await Response.update({ userId: user.userId }, { where: { tempId: tempId } });
                    }
                //   res.status(200).send({ message: 'Login successful', user: {name: user.name, email: user.email} });
                    res.status(200).send({ userId: user.userId, name: user.name, email: user.email, password: user.password, tempId: user.tempId  } );
                } else {
                    res.status(401).send({ message: 'Invalid credentials' });
                }
            }
        } else {
            // User not found
            res.status(401).send({ message: 'User not found' });
        }


    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedUser[0]) {
            res.send('User updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

