module.exports = {
  isStringANumber: function (string) {
    return /^\d+$/.test(string);
  }
};