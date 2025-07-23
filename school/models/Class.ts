import mongoose, { Schema } from 'mongoose';

const ClassSchema = new Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Grade 10 - A"
  capacity: { type: Number },
  supervisor: { type: String },
  enrolledDate: { type: Date, default: Date.now }
});

const Class = mongoose.models.Class || mongoose.model('Class', ClassSchema);

export default Class;
