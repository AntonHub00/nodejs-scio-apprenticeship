# Node JS

This project was created to test my skills with Node JS, TypeScript, Express and
TypeORM (CRUD) and authentication with JWT.

It is suposed to be a backend for users to manage movies and actors. A user can
apply CRUD operations for movies and actors and also add existing actors to an
existing movie. In order to use those enpoints at least one user must registered
and authenticated. Just to make it easier, all created users will share the same
data (movies and actors).

## Technologies used

- TypeScript
- Express
- TypeOrm
- JWT
- Bcrypt
- SQL Server

## Setup

1. Clone the ".env.template" file in the same directory and name it ".env"
2. Replace the jwt secret and the app port with valid values that you want
3. Replace the database configuration values with the correct values for your
   enviroment (remember that this project is meant to be used with SQL Server)
4. Create a database in your SQL Server instance with the same name you defined
   in the ".env" file
5. Install the dependencies: `npm install`
6. Run the project: `npm run start`
