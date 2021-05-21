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

const STORAGE_KEY = 'itss-todo';

function useStorage() {
  const [items, setItems] = useState([]);
　
　/* 副作用を使う */
  useEffect(() => {
    const savedItems = [];

    db.collection("todos").onSnapshot(snapshot => {
      setItems(snapshot.docs.map(doc => ({
        key: doc.id,
        text: doc.data().text,
        done: doc.data().done,
      })));
    });
  }, []);

  const putItems = items => {
    setItems(items);
    localStorage.setItem("todoItems", JSON.stringify(items));
  };

  const clearItems = () => {
    setItems([]);
    localStorage.setItem("todoItems", JSON.stringify([]));
  };

  return [items, putItems, clearItems];
}

export default useStorage;