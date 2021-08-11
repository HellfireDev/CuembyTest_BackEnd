# Cuemby Backend

A simple app made with Express.js and PostgreSQL.

## Project Structure
![image](https://user-images.githubusercontent.com/52900601/129096848-623343b0-64b7-4a4a-b7f1-8064d809a8a0.png)

- config: Holds items per page definition.
- controllers: API endpoints logic.
- helpers: Only holds logic to order player search results.
- models: DB connection.
- scripts: It contains 2 scripts -> create a local Postgres db, and populate local db with FUT21 API data.
- server.js: Entry point of the app.
- Dockerfile and .dockerignore: Simple configuration to generate a minimal working dockerized app.
