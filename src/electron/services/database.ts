import * as db from 'knex';
import * as sqlite3 from 'sqlite3';
import { from } from 'rxjs';

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

    public getSettings(): any {
        return this.orm('settings').select().then((results) => {
            return results[0];
        });
    }
    public getUser(userName): any {
        return this.orm.select(
            'u.id',
            'u.userId',
            'u.email',
            'u.fName',
            'u.lName',
            'u.pass',
            'u.lastLogin',
            'p.roles_id')
            .from('users AS u')
            .innerJoin('permissions AS p', 'p.users_id', 'u.id' )
            .where('u.userId', '=', userName)
            .then((results) => {
                let userWithRoles: any = {};
                const userRoles: Array<Number> = [];
                results.forEach(userObject => {
                    userWithRoles = userObject;
                    userRoles.push(userObject.roles_id);
                });
                userWithRoles.roles_id = userRoles;
                console.log(userWithRoles);
                return userWithRoles;
            });
    }
    public insertCategory(category) {
        delete category.id;
        category.created_at = Date.now();
        category.updated_at = Date.now();
        return this.orm('categories').insert(category).then((results) => {
            console.log('service:database:insertCategory:results:', results);
            return results;
        });
    }
    public getCategories() {
        return this.orm.select().from('categories').then((results) => {
            console.log('service:database:getCategories:results.length:', results.length);
            return results;
        });
    }
    public updateCategory(category) {
        return this.orm('categories').where('id', '=', category.id).update(category).then((results) => {
            console.log('service:database:updateCategories:results:', results);
            return results;
        });
    }
    public deleteCategories(listCategory) {
        return this.orm('categories').whereIn('id', listCategory).del().then((results) => {
            console.log('service:database:deleteCategories:results:', results);
            return results;
        });
    }
}
