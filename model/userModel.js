import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    admin: { type: Boolean },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export { User };
