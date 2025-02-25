export interface IStore{
    findOne<T>(key:string): T | null;
    addOrUpdate<T>(key:string, value: T):void;
    find<T>(): T[];
}