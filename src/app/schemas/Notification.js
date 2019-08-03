import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      requirede: true
    },
    user: {
      type: Number,
      requirede: true
    },
    read: {
      type: Boolean,
      requirede: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Notification', NotificationSchema);
