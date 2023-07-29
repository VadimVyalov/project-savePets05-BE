const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const { SEX } = require("../config");
const pet = new Schema(
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
    sex: {
      type: String,
      enum: SEX,
      default: SEX[0],
    },
    photoUrl: {
      type: String,
      default: null,
    },

    comments: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },

  { versionKey: false, timestamps: true }
);

pet.post("save", mongooseError);
const Pet = model("pet", pet);

module.exports = Pet;
