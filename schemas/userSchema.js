import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  img: {
    type: String,
  },
  groups: {
    type: [String],
    default: [],
  },
  tasks: {
    type: [mongoose.ObjectId],
    default: [],
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
});

// convert password to hashed password at creation
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// define USER methods
UserSchema.methods = {
  // authenticate a user at log in
  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashed_password;
  },
  // encrypt password
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      console.log(error);
      return "";
    }
  },
  // make salt for encryption
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + "");
  },
};

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
