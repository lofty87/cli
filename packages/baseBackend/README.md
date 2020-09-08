# Backend

it is a development environment based on [nodemon](https://nodemon.io/)([ts-node](https://github.com/TypeStrong/ts-node)) and [webpack](https://webpack.js.org/) for the lofty87 backend project.

* [koa](https://koajs.com/)
* [mongoose](https://mongoosejs.com/)(mongodb)
* [nodemailer](https://nodemailer.com/about/)(use [pug](https://pugjs.org/api/getting-started.html) template engine)

## 1. Installation

```bash
npm install
```

## 2. Environment Variable

set in the *.env* file.

```txt
# required
NODE_ENV
TIMEZONE
PORT
PUBLIC_URL
MONGO_DB_HOST
MONGO_DB_USERNAME
MONGO_DB_PASSWORD
JWT_SECRET_KEY

# optional
GOOGLE_SMTP_HOST
GOOGLE_SMTP_PORT
GOOGLE_API_OAUTH_ACCOUNT
GOOGLE_API_OAUTH_CLIENT_ID
GOOGLE_API_OAUTH_CLIENT_SECRET
GOOGLE_API_OAUTH_REFRESH_TOKEN
GOOGLE_API_OAUTH_ACCESS_TOKEN
GOOGLE_API_OAUTH_TOKEN_EXPIRES
```

## 3. Development

use **nodemon** and **ts-node** and is not build.

you can always work in watch mode.

```bash
npm run start:dev
```

## 4. Production

use **webpack** and is build.

if **NODE_ENV** environment variable is `development`, you can also work in watch mode.

```bash
npm run build
```

## 5. Clean

remove *build* and *node_modules* dirs.

```bash
npm run clean
```