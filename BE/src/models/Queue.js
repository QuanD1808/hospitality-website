const mongoose = require('mongoose');

const QueueSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['waiting', 'in_progress', 'completed', 'canceled'],
      default: 'waiting'
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    notes: {
      type: String,
      default: ''
    },
  },
  {
    timestamps: true,
  }
);

// Tạo custom queueId trước khi lưu
QueueSchema.pre('save', async function (next) {
  // Chỉ tạo queueId nếu là document mới
  if (this.isNew) {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const count = await this.constructor.countDocuments();
    this.queueId = `Q${dateStr}-${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Queue', QueueSchema);
