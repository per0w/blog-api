# Blog-API

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Project for studying and experiment with server side by NodeJS.
In the context of the project will be implemented API for blog.

## Main packages:

- [TypeScript](https://www.typescriptlang.org/)
- [Babel](https://babeljs.io/)
- [Koa](http://koajs.com/)
- [Koa-router](https://github.com/alexmingoia/koa-router)
- [Mongoose](https://github.com/Automattic/mongoose)

## Settings

Before start app, you should pass env: `MONGO_URI`
There are several ways to pass env.

Pass it before start app:

```
MONGO_URI=mongodb://localhost/my_database
```

Add to: `./config/default.json`

```json
"mongo": {
  "uri": "mongodb://localhost/my_database"
},
```

Or create file: `.env`

```
MONGO_URI=mongodb://localhost/my_database
```

## Use

```bash
# Install dependencies
yarn install
```

```bash
# Run server
yarn start
```

```bash
# Run server with nodemon
yarn dev
```

```bash
# Run lint
yarn lint
```

```bash
# Fix lint errors
yarn lint:fix
```