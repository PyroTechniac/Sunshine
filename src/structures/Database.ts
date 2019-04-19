import { ConnectionManager } from 'typeorm';
import { Setting } from '../models/Settings';
import { Case } from '../models/Cases';


const connectionManager = new ConnectionManager();
connectionManager.create({
    name: 'sunshine',
    type: 'mongodb',
    url: process.env.DB,
    entities: [Setting, Case]
});

export default connectionManager;
