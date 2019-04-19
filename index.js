require('reflect-metadata');
require('dotenv').config();
const SunshineClient = require('./client/SunshineClient');

new SunshineClient().start();