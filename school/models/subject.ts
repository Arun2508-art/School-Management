import mongoose, { Schema } from 'mongoose';

const SubjectSchema = new Schema({
  name: { type: String, required: true }, // e.g., "Mathematics"
  teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  ]
});

const Subject =
  mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

export default Subject;
