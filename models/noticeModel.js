const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const { CATEGORY, SEX, REGEXP } = require("../config");
const notice = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: CATEGORY,
      default: CATEGORY[0],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      match:[REGEXP.title.reg,REGEXP.title.mes],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      match:[REGEXP.name.reg,REGEXP.name.mes],
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      match:[REGEXP.type.reg,REGEXP.type.mes],
    },
    sex: {
      type: String,
      required: [true, "Sex is required"],
      enum: SEX,
      default: SEX[0],
    },
    photoUrl: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      match:[REGEXP.location.reg,REGEXP.location.mes],
    },
    price: {
      type: Number,
      min: 1,
      required: (category) => category === CATEGORY[0],
      default: null,
    },
    comments: {
      type: String,
      maxLength:120,
      default: null,
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
