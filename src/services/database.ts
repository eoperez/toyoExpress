import * as db from 'knex';
import * as sqlite3 from 'sqlite3';

export interface iData {
    dbLocation: string;
    orm: db;
    setOrm(dbLocation: string): void;
    getOrm(): db;
    getDbLocation(): string;
    createDmsDB(dbLocation: string): void;
}

export class Data implements iData{
    dbLocation: string;
    orm: db;

    constructor(dbLocation: string){
        this.setOrm(dbLocation);
    };

    public setOrm(dbLocation : string) {
        this.orm = db({
            client: 'sqlite3',
            connection: {
                filename: dbLocation
            },
            useNullAsDefault: true
        });
    };
    
    public getOrm(): db{
        return this.orm;
    };
    
    public getDbLocation() : string {
        return this.dbLocation
    };

    public createDmsDB(dbLocation): void {
        console.log('Creating SQLite3 Db, in location: '+ dbLocation);
        //do your thing });
        let dbFile = new sqlite3.Database(dbLocation, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => { 
            if (err) {
                throw new Error(err.message);
            }
            console.log('Database file Created');
        });
        dbFile.close((err) => {
            if(err){
                throw new Error(err.message);
            }
            console.log('Connection Closed');
        });
        return null;
    };
};