// config.js
const dotenv = require('dotenv').config();

module.exports = {

  PASSWORD: process.env.PASSWORD,
  MY_PASS: process.env.MY_PASS,
  MY_USER: process.env.MY_USER,
  HOST: process.env.HOST,
  PORT: process.env.PORT
}