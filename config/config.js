const TOKEN = {
  access: "3000s",
  refresh: "6000s",
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
    // reg: /^[^`][^\d_!¡?÷?¿+=@#$%ˆ&*(){.,}| ~<>;:\^\[\]\-\/\\]{1,14}$/,
    reg: /^[\p{Lu}]{1}[\p{Ll}'`]{1,15}$/u,
    mes: "Field 'name' must contain minimum 2 characters, maximum 16, only unicode letter and first leter uppercase",
  },
  city: {
    // reg: /^[^`][^\d_!¡?÷?¿+=@#$%ˆ&*(){.,}| ~<>;:\^\[\]\-\/\\]{1,14}$/,
    reg: /^[\p{Lu}]{1}[\p{Ll}'`]{1,31}$/u,
    mes: "Field 'city' must contain minimum 2 characters, maximum 32, only unicode letter and first leter uppercase",
  },
};

module.exports = { TOKEN, REGEXP };
