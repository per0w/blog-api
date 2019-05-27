import Router from 'koa-router';

import articlesController from './controllers/articles-controller';
import checkUser from '../../hadlers/checkUser';
import checkArticle from './handlers/checkArticle';
import { Article } from './models';

const router = new Router({ prefix: '/articles' });

router
    .post('/', checkUser(), articlesController.create)
    .get('/', articlesController.searchArticles)
    .param('hash', checkArticle())
    .put('/:hash', checkUser(), articlesController.update)
    .delete('/:hash', checkUser(), articlesController.delete)
    .get('/:hash', articlesController.getArticle);

export { Article };

export default router.routes();
