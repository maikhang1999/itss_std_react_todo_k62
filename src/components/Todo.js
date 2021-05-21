import React, { useState, useEffect } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  const [items, addItem, updateItem, clearItems] = useStorage(); 
  const [filterItems, setFilterItems] = useState([]);
  
  useEffect(() => {
    setFilterItems(items);
  }, [items]);
  
  const handleOnItemClick = (newItem) => {
    updateItem(newItem)
  }
  
  const handleOnEnterInput = (newItem) => {
    addItem(newItem);
  }
  
  const handleOnFilterClick = (element) => {
    if (element.text === "未完了") {
      setFilterItems(items.filter((item) => item.done === false));
    }
    else if (element.text === "完了済み") {
      setFilterItems(items.filter((item) => item.done === true));
    }
    else {
      setFilterItems(items);
    }
  }
  
  const handleDeleteItems = () => {
    clearItems();
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input onEnterInput={handleOnEnterInput} />
      <Filter onFilterClick={handleOnFilterClick} />
      {filterItems.map(item => (
        <TodoItem 
          key={item.key}
          item={item} 
          onItemClick={handleOnItemClick} 
        />
      ))}
      <div className="panel-block">
        {filterItems.length} items
      </div>
      <div className="panel-delete has-text-centered">
        <button className="button is-danger" onClick={handleDeleteItems}>
          全てのTodoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;