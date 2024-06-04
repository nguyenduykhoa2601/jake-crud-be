import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  avatarUrl: { type: String, required: true },
  address: { type: String, required: true }
});

const User = model<IUser>('User', userSchema);

export default User;
