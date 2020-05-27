const keys = require("../keys");

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Reset password",
    html: `
    <h1>Forgot password?</h1>
    <p>If no, ignore this letter</p>
    <p>Else press link</p>
    <p><a href="${keys.BASE_URL}/auth/password/${token}">Reset password</a></p>
    <hr />
    <a href="${keys.BASE_URL}">Course shop</a>
    `,
  };
};
