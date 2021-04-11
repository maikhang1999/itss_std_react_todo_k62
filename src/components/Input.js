import React, { useState } from 'react';
/* 
  【inputコンポーネント】
　・新しいTodoを作成するINPUTフィールドを作成するコンポーネント
　・Enterをクリックされたら入力された文字を使って新しいTodoを作成する
*/
function Input({ onEnterInput }) {
  const [newItem, setNewItem] = useState("");
  
  const setValueInput = (e) => {
    setNewItem(e.target.value);
  }
  
  const handleOnKeyEnterUp = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      onEnterInput(newItem)
      setNewItem("");
    }
  }
  
  return (
    <div className="panel-block">
      <input 
        type="text" 
        className="input"
        placeholder="Todoを入力してください"
        value={newItem}
        onChange={setValueInput}
        onKeyUp={handleOnKeyEnterUp}
      />
    </div>
  );
}

export default Input;