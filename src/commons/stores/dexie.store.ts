import { Dexie } from "../../../node_modules/dexie/dist/modern/dexie.mjs";
export class DexieStore {
  #db;
  constructor(databaseName, version, stores) {
    this.#db = new Dexie(databaseName);
    this.#db.version(version).stores(stores);
  }

  findOne<T>(storeName, key): Promise<T> {
    return  this.#db.table(storeName).get(key);
  }
  async addOrUpdate(storeName, item) {
    const exist = await this.#db.table(storeName).get(item.id);
    if (exist) {
      return this.#db.table(storeName).update(item.id, item);
    } else {
      return this.#db.table(storeName).add(item);
    }
  }
  async find(storeName) {
    return this.#db.table(storeName).toArray();
  }

  async remove(storeName, id) {
    return this.#db.table(storeName).delete(id);
}
}
