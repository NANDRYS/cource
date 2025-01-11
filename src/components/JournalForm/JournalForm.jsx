import { useEffect, useReducer } from "react";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import cn from "classname";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, isFormReadyToSubmit } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.title || !isValid.post) {
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit]);

  const onChanges = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const addJurnalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  return (
    <>
      <form className={styles["journal-form"]} onSubmit={addJurnalItem}>
        <div>
          <input
            onChange={onChanges}
            value={values.title}
            type="title"
            name="title"

            className={cn(styles["input-title"], {
              [styles["invalid"]]: !isValid.title,
            })}
          />
        </div>

        <div className={styles["form-row"]}>
          <label htmlFor="date" className={styles["form-label"]}>
            <img src="/public/calendar.svg" alt="#" />
            <span>Дата</span>
          </label>
          <input
            onChange={onChanges}
            id="date"
            value={values.date}
            type="date"
            name="date"
            className={cn(styles["input"], {
              [styles["invalid"]]: !isValid.date,
            })}
          />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="tag" className={styles["form-label"]}>
            <img src="/public/folder.svg" alt="#" />
            <span>Метки</span>
          </label>
          <input
            onChange={onChanges}
            value={values.tag}
            type="text"
            id="tag"
            name="tag"
            className={styles["input"]}
          />
        </div>

        <textarea
          onChange={onChanges} value={values.post}
          name="post"
          id=""
          cols="30"
          rows="10"
          className={cn(styles["input"], {
            [styles["invalid"]]: !isValid.post,
          })}
        ></textarea>
        <Button text="Сохранить" />
      </form>
    </>
  );
}
export default JournalForm;
