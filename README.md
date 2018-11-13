# DMS - ToyoExpress

This project was generated with:
* [NodeJS]() v11.1.0
* [Angular CLI](https://github.com/angular/angular-cli) v7.0.5
* [Electron](https://electronjs.org) v3.0.9
* [Foundation Site](https://foundation.zurb.com) v6.5.0
* [SQLite](https://github.com/mapbox/node-sqlite3) v4.0.4
* [Knex](https://knexjs.org) v0.15.2

## First time setup:
1. Clone this repo
1. Install NodeJS packages: `npm install`
1. Rebuild Electron `npm run rebuildElectron`
1. Build: `npm run build` a `dist` directory should be created automatically.
1. Start your development electron app: `npm run start` - first time it should create a DB file:
`Database file not found in: ./data/dms.db, creating database`
`Creating SQLite3 Db, in location: ./data/dms.db`
`Database file Created`
`Connection Closed`

## After first time, start Electron

Run `npm run start` The app will automatically reload if you change any of the source files.

## FrontEnd Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

