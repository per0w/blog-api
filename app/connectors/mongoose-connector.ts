import mongoose from 'mongoose';

mongoose.Promise = Promise;

export default async (mongoUri: string) => {
    if (!mongoUri) {
        throw Error('Mongo uri is undefined');
    }

    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
    };

    const mongodb = await mongoose.connect(mongoUri, options);
    console.log('Mongo connected');
    return mongodb;
};
