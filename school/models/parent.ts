import mongoose, { Schema } from 'mongoose';

const ParentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, default: 'parent' },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  relationship: { type: String } // e.g., "Father", "Mother", "Guardian"
});

const Parent = mongoose.models.Parent || mongoose.model('Parent', ParentSchema);

export default Parent;
