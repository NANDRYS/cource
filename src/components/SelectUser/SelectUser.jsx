function SelectUser({  changeUser }) {

  return (
    <select name="user" id="user" onChange={changeUser}>
      <option value="1">Алекс</option>
      <option value="2">Валера</option>
    </select>
  );
}

export default SelectUser;
