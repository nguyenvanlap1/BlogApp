const User = require('../models/User');
const path = require('path');

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        // res.status(500).send('An error occurred while creating the user.');
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        console.log(validationErrors);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/auth/register');
    }
};