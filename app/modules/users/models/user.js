import mongoose, { Schema } from 'mongoose';
import bcrypt, { genSalt, genSaltSync } from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
    email: {
        type: String,
        unique: 'User with email {VALUE} alredy exist',
        lowercase: true,
        required: 'Email is required',
    },
    password: {
        type: String,
        requred: 'Password is requred',
    },
    firstName: {
        type: String,
        lowercase: true,
        required: 'First name is requred',
    },
    lastName: {
        type: String,
        lowercase: true,
        required: 'Last name is requred',
    },
}, {
    timestamps: true,
});

UserSchema.statics.createFields = ['email', 'password', 'firstName', 'lastName'];

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = bcrypt.genSaltSync(10);

    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.statics.findOneWithPublicFields = function(params, cb) {
    return this.findOne(params, cb).select({ password: 0, _id: 0, __v: 0 });
};

export default mongoose.model('user', UserSchema);
