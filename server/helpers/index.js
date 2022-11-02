const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 

const hashPass = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
const comparePass = (pass, hash) => bcrypt.compareSync(pass, hash);
const signToken = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = { hashPass, comparePass, signToken, verifyToken }