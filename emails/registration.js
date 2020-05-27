const keys = require("../keys");

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Account is created",
    html: `
    <h1>Welcome to our store</h1>
    <p>Account was successfully created with - ${email}</p>
    <hr />
    <a href="${keys.BASE_URL}">Course shop</a>
    `,
  };
};
