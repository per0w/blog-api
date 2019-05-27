import { MAX_SIZE, PAGE } from '../constants/pagination';

export default queryParams => {
    const search = {
        title: queryParams.title ? queryParams.title : '',
        tags: queryParams.tags ? queryParams.tags.split(',') : [],
        size: parseInt(queryParams.size, 10),
        page: parseInt(queryParams.page, 10),
    };

    if (!search.size || search.size > MAX_SIZE) {
        search.size = MAX_SIZE;
    }

    if (!search.page) {
        search.page = PAGE;
    }

    return search;
};
