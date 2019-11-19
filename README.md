# Introduction

This Express API template already have the following features set up:

- Basic authentication: registration, login and logout
- Forgot password feature
- Email verification: by default, this feature is set to false (i.e. optional). You can make it compulsory by setting `MUST_VERIFY_EMAIL=true` in the .env file
- Manage basic profile information
- Manage profile image
- Change password feature

# Installation

- Clone the application and run `npm install`
- Create a _.env_ file by running `cp .env.example .env` and provide necessary environment variables.
- Run `npm run db-migrate` to create database migrations
- Run `npm run dev` to start dev server
- Launch Postman or Insomnia and run
- Test if everything is up and running on Postman or Insomnia by sending a `GET` request to `localhost:{APP_PORT}/api/v1/status`. A `200 response code` is an indication that everything is up and running.

# Environment variables worth explaining

### MAIL:

The application supports sending of mails using SMTP or [Sendgrid](https://app.sendgrid.com/) API method. You can use either of the options. To use SMTP, set `MAIL_DEFAULT_METHOD=smtp` and provide the values for the following depending on the mailing service you are using;

```
MAIL_DEFAULT_METHOD=smtp
MAIL_FROM_ADDRESS=noreply@nodetestapp.com
MAIL_FROM_NAME="Node Test App"
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
```

Note that, by default you can also test the mailing feature using [Mailtrap](https://mailtrap.io) by just providing your [Mailtrap](https://mailtrap.io) **username** and **password** as seen on your [Mailtrap Dashboard](https://mailtrap.io/inboxes). Note that this is only for testing purpose while developing.

To make use of the second mailing option, which is the [Sendgrid](https://app.sendgrid.com/) API method, set `MAIL_DEFAULT_METHOD=api` and provide the value for `SENDGRID_API_KEY=`. This is the [Sendgrid](https://app.sendgrid.com/) API KEY you created on your [Sendgrid Dashboard](https://app.sendgrid.com/). You can visit their [website](https://app.sendgrid.com/) to know more about this.

### TOKEN:

The `TOKEN_SECRET_KEY=` is used by the [jsonwebtoken npm package](https://www.npmjs.com/package/jsonwebtoken). Please, don't leave this option blank. `TOKEN_LIFETIME=` can also be set to any value of your choice, by default it is set to 365 days which is a year. You can visit their [page](https://www.npmjs.com/package/jsonwebtoken) on npm to know more.

# Technologies Used

- NodeJs / Express
- MySQL Database with Sequelize as ORM
