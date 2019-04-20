import { config } from 'dotenv';
import { ConnectionManager } from 'typeorm';
import { Case } from '../models/Cases';
import { Reminder } from '../models/Reminders';
import { RoleState } from '../models/RoleStates';
import { Setting } from '../models/Settings';
import { Tag } from '../models/Tags';
config();

const connectionManager = new ConnectionManager();
connectionManager.create({
    name: 'sunshine',
    type: 'postgres',
    url: process.env.DATABASE,
    entities: [Setting, Tag, RoleState, Case, Reminder]
});

export default connectionManager;
