import { useState, useEffect } from 'react';
import db from '../lib/firebase';
/* 
  【Storageフック】
　・TodoをlocalStorageを使って保存する
　・以下機能をサポートする
　  - localstrageに保存されているすべてのTodoの読み出し機能
　  - Todoをlocalstrageに保存する
　  - localstrageにあるTodoを削除する
*/

/* global localStorage */

const STORAGE_KEY = 'todos';

function useStorage() {
  const [items, setItems] = useState([]);
　
　/* 副作用を使う */
  useEffect(() => {
    const savedItems = [];

    db.collection(STORAGE_KEY).onSnapshot(snapshot => {
      setItems(snapshot.docs.map(doc => ({
        key: doc.id,
        text: doc.data().text,
        done: doc.data().done,
      })));
    });
  }, []);
  const addItem = async item => {
    await db.collection(STORAGE_KEY).add({
      text: item,
      done: false,
    });
  }

  const updateItem = async item => {
    const updatedItem = db.collection(STORAGE_KEY).doc(item.key);
    await updatedItem.update({
      done: !item.done,
    });
  };
  const clearItems = async () => {
    const allItems = await db.collection(STORAGE_KEY).get();
    const batch = db.batch();
    allItems.forEach(item => {
      batch.delete(item.ref);
    });
    await batch.commit();
  }
  return [items, addItem, updateItem, clearItems];
}

export default useStorage;