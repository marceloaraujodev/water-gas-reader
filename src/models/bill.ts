import mongoose, { Schema, Document, Model } from 'mongoose';

interface IBill extends Document {
  image_url: string;
  customerCode: string;
  measureDateTime: Date;
  measureType: MeasureType;
  read: Boolean;
  measure_uuid: string;
  measurement: number;
  has_confirmed: boolean;
}

enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}

const BillSchema: Schema<IBill> = new mongoose.Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    customerCode: {
      type: String,
      required: true,
    },
    measureDateTime: {
      type: Date,
      required: true,
    },
    measureType: {
      type: String,
      enum: Object.values(MeasureType),
      required: true,
    },
    measure_uuid: {
      type: String,
      required: true,
      unique: true,
    },
    measurement: {
      type: Number,
      required: true,
    },
    has_confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Bill: Model<IBill> =
  mongoose.models?.Bill || mongoose.model<IBill>('Bill', BillSchema);

export default Bill;
