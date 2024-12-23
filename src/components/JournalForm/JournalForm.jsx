
import Button from "../Button/Button";
import "./JournalForm.css";

function JournalForm({ onSubmit }) {
  

  const addJurnalItem = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps)
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
         
        />
        <textarea name="text" id="" cols="30" rows="10"></textarea>
        <Button text="Сохранить" />
      </form>
    </>
  );
}
export default JournalForm;
