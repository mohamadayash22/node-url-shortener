import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema(
  {
    urlId: {
      type: String,
      required: true,
    },
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Url', urlSchema);
