import dbConnect from "../../../lib/dbConnect";
import Users from "../../../schemas/userSchema";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const { email } = req.query;
    const user = await Users.findOne({ email: email });
    res.status(200).json({ user });
  } else {
    res.status(500).json({ error: "invalid request method" });
  }
}
