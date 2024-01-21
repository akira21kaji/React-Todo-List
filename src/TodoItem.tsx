function TodoItem({ item }) {
  return (
    <label className="panel-block">
      <input type="checkbox" />
      {item.text}
    </label>
  );
}

export default TodoItem;
