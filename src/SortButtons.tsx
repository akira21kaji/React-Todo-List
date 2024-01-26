function SortButtons({
  onClickSortByAlphabet,
  onClickSortByAlphabetNone,
  onClickSortByCreation,
  onClickSortByCreationNone,
  handleChecked,
}) {
  return (
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
  );
}

export default SortButtons;
