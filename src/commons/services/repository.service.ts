export class RepositoryService{
    #store;
    constructor(store){
        this.#store = store
    }
    findOne<T>(storeName, key): Promise<T | null>{
        return this.#store.findOne(storeName, key);
    }
    addOrUpdate(storeName, item): Promise<void>{
        return this.#store.addOrUpdate(storeName, item);
    }
    find<T>(storeName): Promise<T[]>{
        return this.#store.find(storeName);
    }
    remove(storeName, id):Promise<void>{
        return this.#store.remove(storeName,id)
    }
}