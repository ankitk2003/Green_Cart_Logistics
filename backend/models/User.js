import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String,
  username: String,
});

export default mongoose.model('User', userSchema);
