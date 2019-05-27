import { Article } from 'app/modules/articles';

export default {
    async getArticlesByUserHash(ctx) {
        const {
            state: {
                user: { hash: userHash },
            },
        } = ctx;
        const articles = await Article.find({ userHash });

        ctx.body = { data: articles };
    },
};
