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

# Technologies Used

- NodeJs / Express
- MySQL Database with Sequelize as ORM
