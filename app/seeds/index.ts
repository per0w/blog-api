import { MONGO_URI } from '../config';
import mongooseConnector from '../connectors/mongoose-connector';
import userSeeds from './user-seeds';
import articleSeeds from './article-seeds';

const initSeeds = async () => {
    const mongoConnection = await mongooseConnector(MONGO_URI);

    await mongoConnection.connection.dropDatabase();

    try {
        const users = await userSeeds();
        const articles = await articleSeeds(users);
        console.log(articles);
    } catch (e) {
        console.error(e);
    } finally {
        mongoConnection.disconnect();
    }
};

initSeeds();
