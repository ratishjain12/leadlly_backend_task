import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
interface User extends Document {
  username: string;
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  return next();
});

const User = mongoose.model<User>("User", userSchema);

export default User;
