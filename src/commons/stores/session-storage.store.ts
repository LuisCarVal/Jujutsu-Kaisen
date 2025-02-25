import { IStore } from "../interfaces/store.interface";

export class SessionStorageStore implements IStore {
  findOne<T>(key: string): T | null {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  addOrUpdate<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  find<T>(): T[] {
    return Object.keys(sessionStorage).map((key) =>
      JSON.parse(sessionStorage.getItem(key))
    );
  }
}