const moment = require("moment");

const birthday2age = (birthday) =>
  moment().diff(birthday, "year", false) < 1
    ? ` ${moment().diff(birthday, "month", false)} month`
    : moment().diff(birthday, "year", false) < 2
    ? `1 year`
    : `${moment().diff(birthday, "year", false)} years`;

module.exports = birthday2age;
