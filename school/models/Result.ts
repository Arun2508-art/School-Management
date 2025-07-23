// models/Grade.js
import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Result || mongoose.model('Result', ResultSchema);
