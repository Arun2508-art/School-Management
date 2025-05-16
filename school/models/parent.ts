import mongoose, { Schema } from 'mongoose';

const ParentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  dateOfBirth: { type: Date },
  phone: { type: String },
  address: { type: String },
  role: { type: String, default: 'parent' },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  relationship: { type: String }, // e.g., "Father", "Mother", "Guardian"
  enrolledDate: { type: Date, default: Date.now }
});

const Parent = mongoose.models.Parent || mongoose.model('Parent', ParentSchema);

export default Parent;
