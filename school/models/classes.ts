import mongoose, { Schema } from 'mongoose';

const ClassSchema = new Schema({
  standard: { type: String, required: true, unique: true },
  capacity: { type: Number },
  grade: { type: String },
  supervisor: { type: String },
  enrolledDate: { type: Date, default: Date.now }
});

const Class = mongoose.models.Class || mongoose.model('Class', ClassSchema);

export default Class;
