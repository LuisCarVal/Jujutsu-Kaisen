import { IStore } from "../interfaces/store.interface";

export class LocalStorageStore implements IStore {
  findOne<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  addOrUpdate<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  find<T>(): T[] {
    return Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
  }
}