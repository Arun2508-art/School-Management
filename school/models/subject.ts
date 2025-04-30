import mongoose, { Schema } from 'mongoose';

const SubjectSchema = new Schema({
  subject: {
    type: String,
    unique: true
  },
  teacherName: {
    type: String
  }
});

const Subject =
  mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

export default Subject;
