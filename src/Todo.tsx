import type User from "./Types/User";
import { useState } from "react";
import TodoItem from "./TodoItem";
import Input from "./Input";
import Filter from "./Filter";

const getKey = () => Math.random().toString(32).substring(2);

function Todo() {
  const [items, setItems] = useState<User[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [isOrder, setIsOrder] = useState("");
  const [visible, setVisible] = useState(false);

  const handleAdd = (text) => {
    setItems([...items, { key: getKey(), text, done: false }]);
  };

  const handleFilterChange = (value) => setFilter(value);

  const displayItems = items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "TODO") return !item.done;
    if (filter === "DONE") return item.done;
  });

  const handleCheck = (checked) => {
    const newItems = items.map((item) => {
      if (item.key === checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    setItems(newItems);
  };

  const prepareItems = () => {
    if (isOrder === "") {
      return displayItems;
    }
    return displayItems.sort((a, b) => {
      return isOrder === "asc"
        ? a.text.localeCompare(b.text)
        : b.text.localeCompare(a.text);
    });
  };

  const sortedItems = prepareItems();

  const isAsc = () => setIsOrder("asc");
  const isDesc = () => setIsOrder("desc");
  const isReset = () => setIsOrder("");

  return (
    <div className="panel">
      <div className="panel-heading">React TODO</div>
      <Input onAdd={handleAdd} />
      <Filter onChange={handleFilterChange} value={filter} />
      <div className="panel-block">
        <button onClick={isAsc}>昇順</button>
        <button onClick={isDesc}>降順</button>
        <button onClick={isReset}>入力順</button>
        <div className="is-block">
          <input type="checkbox" onChange={() => setVisible(!visible)} />
          <span>非表示</span>
        </div>
      </div>
      <div>
        {sortedItems.map((item, index) => (
          <TodoItem key={index} item={item} onCheck={handleCheck} />
        ))}
      </div>
      <div className="panel-block">{displayItems.length} items</div>
    </div>
  );
}

export default Todo;
