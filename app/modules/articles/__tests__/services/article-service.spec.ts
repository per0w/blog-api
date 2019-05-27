import pick from 'lodash/pick';

import { connect, dropDb, close } from 'app/utils/mongo';
import { ArticleService } from 'app/modules/articles/services';
import AppError from 'app/helpers/appError';

global.AppError = AppError;

describe('Article Service', () => {
    beforeAll(async () => {
        await connect();
        await dropDb();
    });

    afterAll(async () => {
        await dropDb();
        await close();
    });

    it('create article as expected', async () => {
        const articleData = {
            userHash: 'user-hash',
            title: 'Some article',
            description: 'Test article',
            tags: ['first', 'test'],
        };

        const articleModel = await ArticleService.createArticle(articleData);
        const article = articleModel.toObject();

        expect(pick(article, Object.keys(articleData))).toEqual(articleData);
        expect(article).toHaveProperty('hash');
        expect(article).toHaveProperty('createdAt');
        expect(article).toHaveProperty('updatedAt');

        await dropDb;
    });

    it('error on not valid data for article create', async () => {
        try {
            await ArticleService.createArticle({});
        } catch (e) {
            const { errors } = e.toJSON();

            expect(errors).toHaveProperty('title');
            expect(errors).toHaveProperty('userHash');
            expect(errors).toHaveProperty('description');
            expect(errors).toHaveProperty('tags');
        }
    });
});
