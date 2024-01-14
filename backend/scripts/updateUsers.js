// updateUsers.js

const sequelize = require('../config/sequelize');
const User = require('../models/user');
const { usersList } = require('../data/mockData');

sequelize.sync().then(async () => {
    try {
        const users = await User.findAll({ order: [['id', 'ASC']] });

        let currentUserId = 1; 

        for (const user of users) {
            user.userId = currentUserId++;
            await user.save();
        }

        console.log('All userIds updated successfully.');
    } catch (error) {
        console.error('Error updating userIds:', error);
    } finally {
        sequelize.close(); 
    }
});

