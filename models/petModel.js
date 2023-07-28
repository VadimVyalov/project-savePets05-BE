const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const { CATEGORY, SEX } = require("../config");
const notice = new Schema(
  {
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
    // sex: {
    //   type: String,
    //   enum: SEX,
    //   default: SEX[0],
    // },
    photoUrl: {
      type: String,
      default: null,
    },

    comments: {
      type: String,
      default: null,
    },
  },

  { versionKey: false, timestamps: true }
);

notice.post("save", mongooseError);
const Notice = model("pet", pet);

module.exports = Notice;
