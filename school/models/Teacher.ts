import mongoose, { Schema } from 'mongoose';

const TeacherSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teacherId: { type: String, unique: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dateOfBirth: { type: Date },
  phone: { type: String },
  address: { type: String },
  hireDate: { type: Date, default: Date.now },
  role: { type: String, default: 'TEACHER', enum: ['TEACHER'] }
});

const Teacher =
  mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);

export default Teacher;
