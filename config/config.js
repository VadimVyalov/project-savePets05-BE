const TOKEN = {
  access: "300s",
  refresh: "600s",
};

const REGEXP = {
  password: {
    reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/,
    mes: "Field 'password' must contain minimum 6 characters, maximum 16, at least 1 uppercase letter, 1 lowercase letter and 1 digit with no symbols.",
  },
  phone: {
    reg: /^\+380\d{9}$/,
    mes: "Field 'phone' has invalid phone number format. The format should be +380XXXXXXX.",
  },
  birthday: {
    reg: /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19[7-9]\d|20[0-6]\d)$/,
    mes: "Field 'birthday' has invalid date format. The format should be DD-MM-YYYY.",
  },
};

module.exports = { TOKEN, REGEXP };
