import mongoose from 'mongoose';

export interface IUserDocument extends mongoose.Document {
    email: string;
    hash: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IUser extends IUserDocument {
    comparePassword(password: string): boolean;
}

export interface IUserModel extends mongoose.Model<IUser> {
    createFields: string[];
}
