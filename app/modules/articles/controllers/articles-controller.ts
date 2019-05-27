import pick from 'lodash/pick';
import Koa from 'koa';

import { Article } from '../models';
import { ArticleService } from '../services';
import parseQueryForSearch from '../helpers/parseQueryForSearch';

export default {
    async create(ctx: Koa.Context) {
        const articleData = {
            ...pick(ctx.request.body, Article.createFields),
            userHash: ctx.state.user.hash,
        };

        const { _id } = await ArticleService.createArticle(articleData);
        const article = await Article.findOne({ _id });

        ctx.status = 201;
        ctx.body = { data: article };
    },

    async update(ctx: Koa.Context) {
        const {
            request: { body },
            state: {
                user: { hash },
                article,
            },
        } = ctx;

        if (article.userHash !== hash) {
            ctx.throw(403, `Forbidden. Article with hash "${article.hash}" don't belong user with hash "${hash}"`);
        }

        const newData = pick(body, Article.createFields);
        const updateArticle = await ArticleService.updateArticle(newData, article);

        ctx.body = { data: updateArticle };
    },

    async delete(ctx: Koa.Context) {
        const {
            state: {
                user: { hash },
                article,
            },
        } = ctx;

        if (article.userHash !== hash) {
            ctx.throw(403, `Forbidden. Article with hash "${article.hash}" don't belong to user with hash "${hash}"`);
        }

        await article.remove();

        ctx.body = { data: { hash: article.hash } };
    },
    async getArticle(ctx: Koa.Context) {
        const {
            state: { article },
        } = ctx;

        ctx.body = { data: pick(article, Article.createFields) };
    },
    async searchArticles(ctx: Koa.Context) {
        const queryParams = pick(ctx.request.query, ['title', 'tags', 'size', 'page']);
        const filter = parseQueryForSearch(queryParams);
        const { articles, ...rest } = await ArticleService.search(filter);

        ctx.body = {
            data: articles,
            filter,
            ...rest,
        };
    },
};
