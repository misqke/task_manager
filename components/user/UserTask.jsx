import React from "react";
import styles from "../../styles/user/UserTask.module.scss";

const UserTask = ({ task, toggle }) => {
  return (
    <div className={styles.userTaskContainer}>
      <div className={styles.checkBoxBox}>
        <div className={`${styles.checkBox} `} onClick={() => toggle(task)}>
          <div
            className={`${styles.checkMark} ${
              task.status.completed === true ? styles.completed : null
            }`}
          >
            <span className={styles.checkLine1}></span>
            <span className={styles.checkLine2}></span>
          </div>
        </div>
      </div>
      <div className={styles.infoBox}>
        <h3>{task.title}</h3>
        <p>{task.desc}</p>
      </div>
      <div className={styles.statusBox}>
        {task.status.completed === true ? (
          <>
            <p>Completed</p>
            <p>{task.status.completedAt}</p>
          </>
        ) : (
          <p>in progress...</p>
        )}
      </div>
    </div>
  );
};

export default UserTask;
