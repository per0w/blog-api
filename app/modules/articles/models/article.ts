import mongoose, { Schema } from 'mongoose';
import uuid from 'uuid/v4';

import { IArticleModel, IArticle, IArticleDocument } from './types';

const ArticleSchema = new Schema(
    {
        userHash: {
            type: String,
            required: 'User hash is required',
        },
        title: {
            type: String,
            required: 'Title is requred',
            trim: true,
        },
        hash: {
            type: String,
            unique: 'Hash mast be unique',
        },
        description: {
            type: String,
            required: 'Description is requred',
            trim: true,
        },
        tags: {
            type: [String],
            required: 'Tags are requred',
            trim: true,
            default: undefined,
        },
    },
    { timestamps: true, toJSON: { virtuals: true } },
);

ArticleSchema.statics.createFields = ['title', 'description', 'tags'];

ArticleSchema.pre<IArticleDocument>('save', function(next) {
    if (!this.hash) {
        this.hash = uuid();
    }

    next();
});

ArticleSchema.virtual('user', {
    ref: 'user',
    localField: 'userHash',
    foreignField: 'hash',
    justOne: true,
});

const Article: IArticleModel = mongoose.model<IArticle, IArticleModel>('article', ArticleSchema);

export default Article;
