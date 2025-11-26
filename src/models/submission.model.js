import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    sectionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Section",
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.ObjectId,
          ref: "Questions",
          required: true,
        },
        answer: { type: String, required: true },
      },
    ],
    score: {
        type:Number,
        default:0,
    },
  },

  { timestamps: true }
);

const Submission = new mongoose.model("Submission", SubmissionSchema);
export default Submission;
