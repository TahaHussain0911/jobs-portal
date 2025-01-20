const { default: slugify } = require("slugify");

const generateSlug = (value) => {
  return slugify(value, {
    lower: true,
    replacement: "-",
    strict: true,
  });
};
module.exports = {
  generateSlug,
};
