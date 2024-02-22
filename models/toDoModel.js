import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: false,
    },
    priority: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const ToDo = mongoose.model("ToDo", todoSchema);
