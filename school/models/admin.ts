import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  isSuperAdmin: { type: Boolean, default: false },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent deletion of Super Admin
AdminSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    if (this.isSuperAdmin) {
      const err = new Error('Cannot delete Super Admin');
      return next(err);
    }
    next();
  }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;
