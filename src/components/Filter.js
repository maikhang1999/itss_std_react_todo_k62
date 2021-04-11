import { useState } from 'react';
/* 
  【Filterコンポーネント】
　・該当するTodoをステータス毎にで分けてリスト表示する
　・タブで表示する
　・サポートするステータスは「すべて」「未完了」「完了済み」
*/
function Filter({ onFilterClick }) {
  const [filterElements, setFilterElements] = useState([
    { id: 1, text: '全て', isActive: true },
    { id: 2, text: '未完了', isActive: false },
    { id: 3, text: '完了済み', isActive: false },
  ])
  
  const handleFilterClick = (element) => {
    let newItems = [];
    
    for (const item of filterElements) {
      if (item.id === element.id) {
        item.isActive = true;
      }
      else {
        item.isActive = false;
      }
      newItems.push(item);
    }
    
    setFilterElements(newItems)
    
    onFilterClick(element)
  }
  
  return (
    <div className="panel-tabs">
      { 
        filterElements.map((element, key) => (
          <a 
            href="#" 
            key={key} 
            onClick={() => handleFilterClick(element)}
            className={element.isActive ? 'is-active' : ''}
          >
            {element.text}
          </a>
      ))}
    </div>
  );
}

export default Filter