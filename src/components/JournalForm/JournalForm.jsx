import { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import cn from "classname";

function JournalForm({ onSubmit }) {
  const INITIAL_STATE = {
    title: true,
    post: true,
    date: true,
  };

  const [formValidState, setFormValidState] = useState(INITIAL_STATE);

  useEffect(() => {
    let timerId;
    if (!formValidState.date || !formValidState.title || !formValidState.post) {
      timerId = setTimeout(() => {
        setFormValidState(INITIAL_STATE)
      }, 2000);
    }
    return () => {
       clearTimeout(timerId)
    }
  }, [formValidState]);

  const addJurnalItem = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let isFormValid = true;

    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.post?.trim().length) {
      setFormValidState((state) => ({ ...state, post: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, post: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <>
      <form className={styles["journal-form"]} onSubmit={addJurnalItem}>
        <div>
          <input
            type="title"
            name="title"
            className={cn(styles["input-title"], {
              [styles["invalid"]]: !formValidState.title,
            })}
          />
        </div>

        <div className={styles["form-row"]}>
          <label htmlFor="date" className={styles["form-label"]}>
            <img src="/public/calendar.svg" alt="#" />
            <span>Дата</span>
          </label>
          <input
            id="date"
            type="date"
            name="date"
            className={cn(styles["input"], {
              [styles["invalid"]]: !formValidState.date,
            })}
          />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="tag" className={styles["form-label"]}>
            <img src="/public/folder.svg" alt="#" />
            <span>Метки</span>
          </label>
          <input type="text" id="tag" name="tag" className={styles["input"]} />
        </div>

        <textarea
          name="post"
          id=""
          cols="30"
          rows="10"
          className={cn(styles["input"], {
            [styles["invalid"]]: !formValidState.post,
          })}
        ></textarea>
        <Button text="Сохранить" />
      </form>
    </>
  );
}
export default JournalForm;
