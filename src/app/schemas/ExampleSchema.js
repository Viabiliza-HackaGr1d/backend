import { Schema, model } from 'mongoose';

const ExampleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Example', ExampleSchema);
