import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV(
    //     {
    //     id: `user-custom-storage`,
    //     //   path: `${USER_DIRECTORY}/storage`,
    //     encryptionKey: 'hunter2'
    // }
)

export const storageMMKV = {
    checkKey: (key) => {
        return storage.contains(key);
    },
    setValue: (key, value) => {
        storage.set(key, value);
        return true;
    },
    setObject: (key, value) => {
        storage.set(key, JSON.stringify(value))
        return true;
    },
    getAllKeys: (key) => {
        const value = storage.getAllKeys(key);
        return value;
    },
    getString: (key) => {
        const value = storage.getString(key);
        return value;
    },
    getNumber: (key) => {
        const value = storage.getNumber(key);
        return value;
    },
    getBoolean: (key) => {
        const value = storage.getBoolean(key);
        return value;
    },
    getObject: (key) => {
        const value = storage.getString(key);
        return JSON.parse(value);
    },
    getBuffer: (key) => {
        const value = storage.getBuffer(key);
        return value;
    },
    deleteKey: (key) => {
        storage.delete(key);
        return true;
    },
    deleteAllKeys: () => {
        storage.clearAll();
        return true;
    },
}