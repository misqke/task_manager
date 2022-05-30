import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import UserWindow from "../components/user/UserWindow";
import axios from "axios";
import {
  getUserTasks,
  addTask,
  deleteTask,
  modifyTask,
} from "../controllers/tasks";
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

  const handleToggleCompletion = async (task) => {
    let taskToSend;
    if (task.status.completed === true) {
      taskToSend = { ...task, status: { completed: false, completedAt: null } };
    } else {
      taskToSend = {
        ...task,
        status: { completed: true, completedAt: Date.now() },
      };
    }
    const updatedTask = await modifyTask(taskToSend);
    const index = tasks.findIndex((task) => task._id === updatedTask._id);
    const newTaskList = [
      ...tasks.slice(0, index),
      updatedTask,
      ...tasks.slice(index + 1),
    ];
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
      <Header user={user} />
      <UserWindow user={user} tasks={tasks} toggle={handleToggleCompletion} />
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
