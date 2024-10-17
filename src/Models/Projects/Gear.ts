import e from 'cors';
import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Gear {
  _id: ObjectId;
  type: GearTypes;
  name: string; // could be the shoe name, brand, etc
  brand: string;
  model: string;
  description: string; //talk about what it was used for, how it was used, etc
  images: string[];
}

enum GearTypes {
  SHOES = 'Shoes',
  HARNESS = 'Harness',
  ROPE = 'Rope',
  QUICKDRAWS = 'Quickdraws',
  CHALK = 'Chalk',
  CHALK_BAG = 'Chalk Bag',
  BELAY_DEVICE = 'Belay Device',
  HELMET = 'Helmet',
  CRASH_PAD = 'Crash Pad',
}

const GearSchema = new Schema<Gear>(
  {
    type: {
      type: String,
      enum: Object.values(GearTypes),
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// GearSchema.plugin(mongooseAggregatePaginate);

const Gears = mongoose.model<Gear>('Gear', GearSchema);

export default Gears;
