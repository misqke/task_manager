import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  creator: {
    type: mongoose.ObjectId,
    required: true,
  },
  members: {
    type: [mongoose.ObjectId],
    default: [],
  },
  tasks: {
    type: [mongoose.ObjextId],
    default: [],
  },
});

export default mongoose.models.Groups || mongoose.model("Groups", GroupSchema);
