import AppError from 'app/helpers/appError';

import { Article } from '../models';

export default {
    async createArticle(data) {
        return Article.create(data);
    },

    updateArticle(data, article) {
        article.set(data);

        try {
            return article.save();
        } catch (e) {
            throw new AppError({ status: 400, ...e });
        }
    },

    async search({ tags, size, page, title }) {
        const query = {
            title: { $regex: new RegExp(title, 'ig') },
            tags: null,
        };
        if (tags.length) {
            query.tags = {
                $in: tags,
            };
        }

        const count = await Article.estimatedDocumentCount(query);
        const pages = Math.ceil(count / size);

        const articles = await Article.find(query)
            .populate('user', { password: 0 })
            .sort({ updatedAt: '-1' })
            .limit(size)
            .skip((page - 1) * size);

        return {
            articles,
            count,
            pages,
        };
    },
};
