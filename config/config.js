const TOKEN = {
  access: "24h",
  refresh: "24h",
};

const REGEXP = {
  password: {
    reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/,
    mes: "Field 'password' must contain minimum 6 characters latin alphabet, maximum 16, at least 1 uppercase letter, 1 lowercase letter and 1 digit with no symbols.",
  },
  phone: {
    reg: /^\+380\d{9}$/,
    mes: "Field 'phone' has invalid phone number format. The format should be +380XXXYYZZ.",
  },
  birthday: {
    reg: /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19[0-9]\d|20[0-9]\d)$/,
    mes: "Field 'birthday' has invalid date format. The format should be DD-MM-YYYY.",
  },
  name: {
    reg: /^[\p{Lu}]{1}[\p{Ll}'`\d]{1,15}$/u,
    mes: "Field 'name' must contain minimum 2 characters, maximum 16, only unicode letter and first leter uppercase",
  },
  city: {
    reg: /^[\p{Lu}]{1}[\p{Ll}'`]{1,31}$/u,
    mes: "Field 'city' must contain minimum 2 characters, maximum 32, only unicode letter and first leter uppercase",
  },
  title: {
    reg: /^[\p{L}' `\d]{1,31}$/u,
    mes: "Field 'title' must contain minimum 2 characters, maximum 32, only unicode letter and digit ",
  },
  type: {
    reg: /^[\p{L}'`\d]{1,15}$/u,
    mes: "Field 'type' must contain minimum 2 characters, maximum 16, only unicode letter",
  },
  location: {
    reg: /^[\p{Lu}]{1}[\p{Ll}'`]{1,31}$/u,
    mes: "Field 'location' must contain minimum 2 characters, maximum 32, only unicode letter and first leter uppercase",
  },
};

const NOTISE_BODY = [
  "title",
  "category",
  "name",
  "birthday",
  "type",
  "sex",
  "location",
];

const PET_BODY = ["name", "birthday", "type"];

const CATEGORY = ["sell", "lost-found", "for-free"];
const SEX = ["male", "female"];

const BASE_IMGURL = "https://res.cloudinary.com/dfvviqdic/image/upload/";
const DEFAULT_USER_IMGURL = "v1690339589/avatars/m55p4t9joavvba8okhiy.jpg";

module.exports = { TOKEN, REGEXP, NOTISE_BODY, PET_BODY, CATEGORY, SEX ,BASE_IMGURL,DEFAULT_USER_IMGURL};
