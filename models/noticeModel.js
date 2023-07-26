const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const { CATEGORY, SEX } = require("../config");
const notice = new Schema(
  {
    category: {
      type: String,
      enum: CATEGORY,
      default: CATEGORY[0],
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
      type: Date,
      default: null,
    },

    type: {
      type: String,
      default: null,
    },
    sex: {
      type: String,
      enum: SEX,
      default: SEX[0],
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
      required: (category) => category === CATEGORY[0],
      default: null,
    },
    comments: {
      type: String,
      default: null,
    },
    follower: {
      type: Array,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

notice.post("save", mongooseError);
const Notice = model("notice", notice);

module.exports = Notice;
