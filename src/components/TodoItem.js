/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
function TodoItem({ item, onItemClick }) {
  const classNameAdded = item.done ? "panel-block has-text-grey-light" : "panel-block"
  
  return (
    <label className={classNameAdded}>
      <input
        type="checkbox" 
        onClick={() => onItemClick(item)}
        defaultChecked={item.done ? true : false}
      />
      { item.text }
    </label>
  );
}

export default TodoItem;