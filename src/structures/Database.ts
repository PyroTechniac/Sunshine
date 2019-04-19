import { ConnectionManager } from 'typeorm';
import { Setting } from '../models/Settings';
import { Tag } from '../models/Tag';

const connectionManager: ConnectionManager = new ConnectionManager();
connectionManager.create({
    name: 'sunshine',
    type: 'postgres',
    ssl: true,
    entities: [Setting, Tag]
});

export default connectionManager;
