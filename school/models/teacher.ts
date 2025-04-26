import mongoose, { Schema } from 'mongoose';

const TeacherSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dateOfBirth: { type: Date },
  email: { type: String, unique: true, lowercase: true },
  phone: { type: String },
  subjects: [{ type: String }], // e.g., ["Math", "Physics"]
  classes: [{ type: String }], // e.g., ["Grade 10", "Class B"]
  address: { type: String },
  hireDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  role: { type: String, default: 'teacher' }
});

const Teacher =
  mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);

export default Teacher;
