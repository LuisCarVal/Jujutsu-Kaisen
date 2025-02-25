import { IStore } from "../interfaces/store.interface";

export class StoreService{
    #store: IStore;
    constructor(store: IStore){
        this.#store = store
    }
    findOne<T>(key: string): T| null{
        return this.#store.findOne<T>(key);
    }
    addOrUpdate<T>(key:string, value: T): void{
        return this.#store.addOrUpdate<T>(key, value);
    }
    find<T>(): T[]{
        return this.#store.find<T>();
    }
}