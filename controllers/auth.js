const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    const passwordRes = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordRes) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, config.jwt, { expiresIn: 60 * 60 });
      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      res.status(401).json({
        message: 'Password invalid.'
      });
    }
  } else {
    res.status(404).json({
      message: 'User not found.'
    });
  }
};

module.exports.register = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({
      message: 'Email already exists.'
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const psw = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(psw, salt)
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
}