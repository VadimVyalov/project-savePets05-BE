const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");

const notice = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      default: "sell",
    },

    title: {
      type: String,
      required: [true, "Title is required"],
    },
    name: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    breed: {
      type: String,
      default: null,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    photoUrl: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      min: 1,
      required: function () {
        return category === "sell";
      },
    },
    comments: {
      type: String,
      default: null,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

notice.post("save", mongooseError);
const Notice = model("notice", notice);

module.exports = Notice;
