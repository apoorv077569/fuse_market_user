import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    question: {
      type: String,
      unique: true,
    },
    options: [
      {
        type: String,
      },
    ],
    correctAnswer: {
      type: String,
    },
  },
  {timestamps:true}
);

const Question = new mongoose.model("Questions", questionSchema);
export default Question;
