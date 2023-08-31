import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  // password: string;  // Assume hashed
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true }
}, { 
  versionKey: false
});

export default mongoose.model<IUser>('User', UserSchema);
