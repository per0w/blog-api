import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

export default {
    genToken(data: string | object) {
        return jwt.sign(data, JWT_SECRET);
    },
    verify(token: string) {
        return jwt.verify(token, JWT_SECRET);
    },
};
