import supertest from 'supertest';

import server from 'app/server';
import { close, dropDb } from 'app/utils/mongo';

import { ArticleService } from '../services';

describe('Aricle routes', () => {
    describe('article search', () => {
        afterAll(async () => {
            await dropDb();
            await close();
            await server.close();
        });
        it('no records in db', async () => {
            const response = await supertest(server).get('/api/articles');

            expect(response.body).toEqual({
                data: [],
                filter: {
                    title: '',
                    tags: [],
                    size: 20,
                    page: 1,
                },
                count: 0,
                pages: 0,
            });
        });
        it('return result of searching as expected', async () => {
            await ArticleService.createArticle({
                userHash: 'user-hash',
                title: 'Some article',
                description: 'Test article',
                tags: ['first', 'test'],
            });
            await ArticleService.createArticle({
                userHash: 'user-hash',
                title: 'Second article',
                description: 'Test article two',
                tags: ['first', 'test', 'two'],
            });

            const response = await supertest(server).get('/api/articles?title=so');
            const {
                body: { filter, data, count, pages },
            } = response;

            expect(filter).toEqual({
                title: 'so',
                tags: [],
                size: 20,
                page: 1,
            });
            expect(data).toHaveLength(1);
            expect(count).toBe(1);
            expect(pages).toBe(1);
        });

        it('no result for searching', async () => {
            const response = await supertest(server).get('/api/articles?title=one article');
            const {
                body: { filter, data, count, pages },
            } = response;
            expect(filter).toEqual({
                title: 'one article',
                tags: [],
                size: 20,
                page: 1,
            });
            expect(data).toHaveLength(0);
            expect(count).toBe(0);
            expect(pages).toBe(0);
        });
    });
});
