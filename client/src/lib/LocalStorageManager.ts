export type StorageManagerKey = "token";

export class LocalStorageManager {
    static save<T>(key: StorageManagerKey, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get<T>(key: StorageManagerKey): T | null {
        const value = localStorage.getItem(key);
        return value != null ? JSON.parse(value) as T : null;
    }

    static remove(key: StorageManagerKey): void {
        localStorage.removeItem(key);
    }
}