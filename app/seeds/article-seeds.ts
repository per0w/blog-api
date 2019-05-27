import faker from 'faker';
import _ from 'lodash';

import { Article } from '../modules/articles';

export default users => {
    if (!users || !users.length) {
        throw Error('Users is required');
    }

    const promises = [];

    _.times(500, () => {
        const articlePromise = Article.create({
            title: faker.lorem.words(2),
            description: faker.lorem.lines(4),
            tags: faker.lorem.words(2).split(' '),
            userHash: users[faker.random.number(499)].hash,
        });

        promises.push(articlePromise);
    });

    return Promise.all(promises);
};
