import mongoose, { Schema, Document, Model } from "mongoose";

interface IBill extends Document {
  image: string;
  customerCode: string;
  measureDateTime: Date;
  measureType: MeasureType;
  read: Boolean;
}

enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}

const BillSchema: Schema<IBill> = new mongoose.Schema({
  image: {
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
  read: {
    type: Boolean,
    default: false,
    required: true, 
  }
}, {
  timestamps: true
});

const Bill: Model<IBill> = mongoose.models?.Bill || mongoose.model<IBill>('Bill', BillSchema);

export default Bill;