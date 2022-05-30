import dbConnect from "../../../lib/dbConnect";
import Users from "../../../schemas/userSchema";
import Tasks from "../../../schemas/taskSchema";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getSession({ req });

  if (req.method === "GET") {
    const userTasks = await Tasks.find({ creator: session.user.id });
    res.status(200).json(userTasks);
  } else if (req.method === "POST") {
    try {
      const { title, desc, deadline } = req.body;
      const { group } = req.body || null;
      const taskToMake = {
        title,
        desc,
        deadline,
        group,
        creator: session.user.id,
      };
      const newTask = await Tasks.create(taskToMake);
      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const taskToDelete = await Tasks.findById(id);
    if (taskToDelete.creator !== session.user.id) {
      res.json({
        error: "unauthorized, only the tasks creator can delete it.",
      });
    }
    await Tasks.findByIdAndDelete(id);
    res.json({ message: "task deleted" });
  } else {
    res.status(500).json({ error: "bad request method" });
  }
}
