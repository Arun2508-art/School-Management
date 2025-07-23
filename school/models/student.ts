import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rollNumber: { type: String, unique: true, required: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  parent: [{ type: Schema.Types.ObjectId, ref: 'Parent' }],
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dateOfBirth: { type: Date },
  phone: { type: String },
  address: { type: String },
  enrolledDate: { type: Date, default: Date.now },
  role: { type: String, default: 'STUDENT', enum: ['STUDENT'] }
});

const Student =
  mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;
