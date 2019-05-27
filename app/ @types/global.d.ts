import AppError from 'app/helpers/appError';

declare global {
    namespace NodeJS {
        interface Global {
            AppError: typeof AppError;
        }
    }
}
