const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const { SEX,REGEXP } = require("../config");
const pet = new Schema(
  {
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
     // required: [true, "Sex is required"],
      enum: SEX,
      default: SEX[0],
    },
    photoUrl: {
      type: String,
      default: null,
    },

    comments: {
      type: String,
      maxLength:120,
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
