import type User from "./Types/User";
import { useState } from "react";
import TodoItem from "./TodoItem";
import Input from "./Input";
import Filter from "./Filter";

const getKey = () => Math.random().toString(32).substring(2);

function Todo() {
  const [items, setItems] = useState<User[]>([]);
  const [filter, setFilter] = useState("ALL");

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

  return (
    <div className="panel">
      <div className="panel-heading">React TODO</div>
      <Input onAdd={handleAdd} />
      <Filter onChange={handleFilterChange} value={filter} />
      {displayItems.map((item) => (
        <TodoItem key={item.text} item={item} onCheck={handleCheck} />
      ))}
      <div className="panel-block">{displayItems.length} items</div>
    </div>
  );
}

export default Todo;
