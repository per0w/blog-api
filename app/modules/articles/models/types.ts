import mongoose from 'mongoose';

export interface IArticleDocument extends mongoose.Document {
    userHash: string;
    title: string;
    hash: string;
    description: string;
    tags: string[];
}

export interface IArticle extends IArticleDocument {
    comparePassword(password: string): boolean;
}

export interface IArticleModel extends mongoose.Model<IArticle> {
    createFields: string[];
}
