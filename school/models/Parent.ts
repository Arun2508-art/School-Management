import mongoose, { Schema } from 'mongoose';

const ParentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  children: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  relationship: {
    type: String,
    enum: ['Father', 'Mother', 'Guardian', 'Other'],
    default: 'Guardian'
  },
  dateOfBirth: { type: Date },
  phone: { type: String },
  address: { type: String },
  enrolledDate: { type: Date, default: Date.now },
  role: { type: String, default: 'PARENT', enum: ['PARENT'] }
});

const Parent = mongoose.models.Parent || mongoose.model('Parent', ParentSchema);

export default Parent;
