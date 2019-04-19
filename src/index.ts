import 'reflect-metadata';
import SunshineClient from './client/SunshineClient';
import { config } from 'dotenv';
config();

new SunshineClient().start();
