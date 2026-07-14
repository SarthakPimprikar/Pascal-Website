import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOpening',
    required: false,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  candidateName: {
    type: String,
    required: true,
    trim: true,
  },
  candidateEmail: {
    type: String,
    required: true,
    trim: true,
  },
  candidatePhone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    trim: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
