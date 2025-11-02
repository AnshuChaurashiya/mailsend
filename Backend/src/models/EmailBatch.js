import mongoose from 'mongoose';

const emailBatchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  recipients: [{ type: String, required: true }],
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

const EmailBatch = mongoose.model('EmailBatch', emailBatchSchema);

export default EmailBatch;
