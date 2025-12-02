import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
    },
    media: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "24h",
    }
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
