import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserTasks, addTask, deleteTask } from "../controllers/tasks";
import { getSession } from "next-auth/react";

const User = ({ user }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [deadline, setDeadline] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    const taskToPost = {
      title,
      desc,
      deadline,
    };
    const newTask = await addTask(taskToPost);

    const newTaskList = [...tasks, newTask];
    setTasks(newTaskList);
    setTitle("");
    setDesc("");
    setDeadline("");
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    const newTaskList = tasks.filter((task) => task._id !== id);
    setTasks(newTaskList);
  };

  useEffect(() => {
    const getTasks = async () => {
      const retrievedTasks = await getUserTasks();
      setTasks(retrievedTasks);
    };
    getTasks();
  }, []);

  return (
    <div>
      <h4>username: {user.name}</h4>
      <h4>id: {user.id}</h4>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="desc"
        />
        <input
          type="datetime-local"
          name="data"
          id="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">add task</button>
      </form>
      <div>
        {tasks.length > 0 &&
          tasks.map((task, i) => (
            <div
              style={{ marginTop: "1rem" }}
              key={i}
              onClick={async () => handleDeleteTask(task._id)}
            >
              <h3>{task.title}</h3>
              {task.desc.length > 0 && <p>{task.desc}</p>}
              {task.deadline && <h5>deadline: {task.deadline}</h5>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default User;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};
