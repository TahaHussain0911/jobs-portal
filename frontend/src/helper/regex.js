const numberRegEx = /[^0-9]+/g;
const keyRegex = /([a-z])([A-Z])/g;
const keyRegexReplacer = "$1 $2";

export { numberRegEx, keyRegex, keyRegexReplacer };
