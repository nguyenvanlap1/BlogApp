const bcrypt = require('bcrypt');
const User = require('../models/User');

const validationErrors = (req, res) => {
    req.flash('validationErrors', 'User name or password is incorrect');
    req.flash('data', req.body);
    return res.redirect('/auth/login');
}

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
                req.session.userId = user._id;
                return res.redirect('/');
            } else {
                validationErrors(req, res);
            }
        } else {
            validationErrors(req, res);
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/auth/login');
    }
};
