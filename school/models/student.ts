import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dateOfBirth: { type: Date },
  email: { type: String, unique: true, lowercase: true },
  phone: { type: String },
  class: { type: String },
  rollNumber: { type: String, unique: true },
  address: { type: String },
  role: { type: String, default: 'student' },
  parent: { type: Schema.Types.ObjectId, ref: 'Parent' },
  enrolledDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

const Student =
  mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;
