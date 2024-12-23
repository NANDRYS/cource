import { useState } from "react";
import Button from "../Button/Button";
import "./JournalForm.css";

function JournalForm({ data, setData }) {
  const [inputData, setInputData] = useState(""); 

  const inputChange = (e) => {
    setInputData(e.target.value);
    // console.log(inputData);
  };

  const addJurnalItem = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
    
  };

  return (
    <>
      <form className="journal-form" onSubmit={addJurnalItem}>
        <input type="title" name="title" />
        <input type="date" name="date" />
        <input
          type="text"
          name="tag"
          value={inputData}
          onChange={inputChange}
        />
        <textarea name="post" id="" cols="30" rows="10"></textarea>
        <Button text="Сохранить" />
      </form>
    </>
  );
}
export default JournalForm;
