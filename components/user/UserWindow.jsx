import React from "react";
import styles from "../../styles/user/UserWindow.module.scss";
import UserTask from "./UserTask";

const UserWindow = ({ user, tasks, toggle }) => {
  console.log("rendering user window from task change: ", tasks);
  return (
    <div className={styles.userWindowContainer}>
      <div>create new task</div>
      <div className={styles.taskContainer}>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <UserTask key={task._id} task={task} toggle={toggle} />
          ))}
      </div>
    </div>
  );
};

export default UserWindow;
