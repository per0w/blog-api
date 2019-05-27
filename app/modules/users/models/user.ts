import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import uuid from 'uuid/v4';

import { IUserDocument, IUser, IUserModel } from './types';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: 'User with email {VALUE} alredy exist',
            lowercase: true,
            required: 'Email is required',
            trim: true,
        },
        hash: {
            type: String,
            unique: 'Hash mast be unique',
        },
        password: {
            type: String,
            requred: 'Password is requred',
            trim: true,
        },
        firstName: {
            type: String,
            lowercase: true,
            required: 'First name is requred',
            trim: true,
        },
        lastName: {
            type: String,
            lowercase: true,
            required: 'Last name is requred',
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

UserSchema.statics.createFields = ['email', 'password', 'firstName', 'lastName'];

UserSchema.pre<IUserDocument>('save', function(next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);

        this.password = bcrypt.hashSync(this.password, salt);
    }

    if (!this.hash) {
        this.hash = uuid();
    }

    next();
});

UserSchema.methods.comparePassword = function(password: string) {
    return bcrypt.compareSync(password, this.password);
};
const User: IUserModel = mongoose.model<IUser, IUserModel>('user', UserSchema);
export default User;
