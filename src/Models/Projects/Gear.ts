import { ObjectId } from 'mongoose';

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
  'Shoes',
  'Harness',
  'Rope',
  'Quickdraws',
  'Chalk',
  'Chalk Bag',
  'Belay Device',
  'Helmet',
  'Crash Pad',
}
