import { Article } from '../models';

export default () => async (hash, ctx, next) => {
    const article = await Article.findOne({ hash });

    if (!article) {
        ctx.throw(404, `Article with id "${hash}" not found`);
    }

    ctx.state.article = article;

    await next();
};
