import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
