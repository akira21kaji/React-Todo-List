import type User from "./Types/User";
import { useState } from "react";
import TodoItem from "./TodoItem";
import Input from "./Input";
import Filter from "./Filter";

const getKey = () => Math.random().toString(32).substring(2);

function Todo() {
  const [items, setItems] = useState<User[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [isOrder, setIsOrder] = useState({ sortColum: "none", isAsc: true });
  const [isChecked, setIsChecked] = useState(false);

  const handleAdd = (text) => {
    setItems([
      ...items,
      { key: getKey(), text, done: false, createdAt: Date.now() },
    ]);
  };

  const handleFilterChange = (value) => setFilter(value);

  const displayItems = items.filter((item) => {
    if (filter === "ALL") {
      return isChecked ? !item.done : true;
    }
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
    if (isOrder.sortColum === "none") {
      return displayItems;
    } else if (isOrder.sortColum === "alphabet") {
      return displayItems.sort((a, b) => {
        return isOrder.isAsc
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text);
      });
    } else {
      return displayItems.sort((x, y) => {
        return isOrder.isAsc
          ? x.createdAt - y.createdAt
          : y.createdAt - x.createdAt;
      });
    }
  };

  const sortedItems = prepareItems();

  const onClickSortByAlphabet = () =>
    setIsOrder({ sortColum: "alphabet", isAsc: true });
  const onClickSortByAlphabetNone = () =>
    setIsOrder({ sortColum: "alphabet", isAsc: false });
  const onClickSortByCreation = () =>
    setIsOrder({ sortColum: "creation", isAsc: true });
  const onClickSortByCreationNone = () =>
    setIsOrder({ sortColum: "creation", isAsc: false });

  const handleChecked = () => setIsChecked(!isChecked);

  return (
    <div className="panel">
      <div className="panel-heading">React TODO</div>
      <Input onAdd={handleAdd} />
      <Filter onChange={handleFilterChange} value={filter} />
      <div className="panel-block">
        <button onClick={onClickSortByAlphabet}>昇順</button>
        <button onClick={onClickSortByAlphabetNone}>降順</button>
        <button onClick={onClickSortByCreation}>入力昇順</button>
        <button onClick={onClickSortByCreationNone}>入力降順</button>
        <div className="is-block">
          <label>完了済みタスクを非表示にする</label>
          <input type="checkbox" onChange={handleChecked} />
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
