import * as db from 'knex';
import * as sqlite3 from 'sqlite3';

export interface IData {
    dbLocation: string;
    orm: db;
    setOrm(dbLocation: string): void;
    getOrm(): db;
    getDbLocation(): string;
    createDmsDB(dbLocation: string): void;
    updateSchema(): void;
}

export class Data implements IData {
    dbLocation: string;
    orm: db;

    constructor(dbLocation: string) {
        this.setOrm(dbLocation);
    }

    public setOrm(dbLocation: string) {
        this.orm = db({
            client: 'sqlite3',
            connection: {
                filename: dbLocation
            },
            useNullAsDefault: true
        });
    }

    public getOrm(): db {
        return this.orm;
    }

    public getDbLocation(): string {
        return this.dbLocation;
    }

    public createDmsDB(dbLocation): void {
        console.log('Creating SQLite3 Db, in location: ' + dbLocation);
        // tslint:disable-next-line:no-bitwise
        const dbFile = new sqlite3.Database(dbLocation, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                throw new Error(err.message);
            }
            console.log('Database file Created');
        });
        dbFile.close((err) => {
            if (err) {
                throw new Error(err.message);
            }
            console.log('Connection Closed');
        });
        return null;
    }

    public updateSchema(): void {
        this.orm.migrate.latest({directory: './dist/migrations'}).catch((error) => {
            throw new error('Issues with Db migration\'s scripts');
        });
    }
}
