# Mean Stack with Docker

This is a simple application that uses the MEAN stack (Mongodb, Express, Angular, & NodeJS). The database(mongodb), server/API(Express/NodeJS), and front-end client (Angular) are separate Docker Containers that are linked with docker compose.

The underlying principle behind the MEAN stack is that everything stays in one language (Javascript) and data format (JSON). The NodeJS server, Angular, and Express are built with Javascript, and MongoDB stores it's data in the form of BSON, which is a binary representation of JSON.

## Files

### `docker-compose.yml`

With docker installed, run the command docker-compose up

### `.gitignore`

This file tells Git to ignore local files, such as the node modules (which are not needed because the package.json lists the application's dependencies) and the mongodb volume that persists the database.

## Directories

### adr

This directory contains the Architectural Design Records

### angular-app

This directory contains the files necessary to run Angular in development mode.

### node-server

This directory contains the files for the NodeJS server along with Express

### mongo-database

This directory will appear once docker-compose has been run. This is where the data will persist.