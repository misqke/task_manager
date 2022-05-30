import axios from "axios";

export const getUserTasks = async () => {
  const { data } = await axios.get("/api/auth/tasks/?");
  return data;
};

export const addTask = async (taskObj) => {
  const { data } = await axios.post("/api/auth/tasks", taskObj);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await axios.delete(`/api/auth/tasks/?id=${id}`);
  return data.message;
};

export const modifyTask = async (modifiedTask) => {
  const { data } = await axios.patch(`/api/auth/tasks`, modifiedTask);
  return data;
};
