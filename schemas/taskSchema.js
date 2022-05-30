import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: "",
    },
    deadline: {
      type: Date,
      default: null,
    },
    creator: {
      type: mongoose.ObjectId,
      required: true,
    },
    group: {
      id: mongoose.ObjectId,
      assignedTo: {
        type: mongoose.ObjectId,
        default: null,
      },
    },
    status: {
      completed: {
        type: Boolean,
        default: false,
      },
      completedAt: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Tasks || mongoose.model("Tasks", TaskSchema);
