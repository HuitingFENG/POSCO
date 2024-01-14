// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

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
        const user = await User.findByPk(req.params.id);
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

router.post('/', async (req, res) => {
    try {
        const newQuestion = await User.create(req.body);
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Error creating user:', error);
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

