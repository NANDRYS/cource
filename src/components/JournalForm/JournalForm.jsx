import { useContext, useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import cn from "classname";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, isFormReadyToSubmit } = formState;

  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

  const focusValid = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: userId });
    }
    dispatchForm({ type: "SET_VALUE", payload: { ...data } });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.title || !isValid.post) {
      focusValid(isValid);
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
      dispatchForm({ type: "SET_VALUE", payload: userId });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId },
    });
  }, [userId]);

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

  const deleteJournalItem = (id) => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: userId });
  };
  return (
    <form className={styles["journal-form"]} onSubmit={addJurnalItem}>
      <div className={styles["form-row"]}>
        <Input
          onChange={onChanges}
          value={values.title}
          type="title"
          isValid={isValid.title}
          ref={titleRef}
          name="title"
          apperance="title"
          className={cn(styles["input-title"], {
            [styles["invalid"]]: !isValid.title,
          })}
        />
        {data?.id && (
          <button
            className={styles["delete"]}
            type="button"
            onClick={deleteJournalItem}
          >
            <img src="../../../public/delete.svg" alt="Del" />
          </button>
        )}
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/public/calendar.svg" alt="#" />
          <span>Дата</span>
        </label>
        <Input
          onChange={onChanges}
          id="date"
          apperance="date"
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          type="date"
          isValid={isValid.date}
          ref={dateRef}
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
        <Input
          onChange={onChanges}
          value={values.tag}
          type="text"
          id="tag"
          name="tag"
          className={styles["input"]}
        />
      </div>

      <textarea
        onChange={onChanges}
        value={values.post}
        name="post"
        ref={postRef}
        id=""
        cols="30"
        rows="10"
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.post,
        })}
      ></textarea>
      <Button>Сохранить</Button>
    </form>
  );
}
export default JournalForm;
