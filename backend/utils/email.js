const nodemailer = require("nodemailer");
const { mailEmail, mailPass } = require("./credentials");

class Email {
  constructor(user) {
    this.to = user?.emai;
    this.name = user?.name;
    this.from = `Always Apply <${mailEmail}>`;
  }
  createTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: mailEmail,
        pass: mailPass,
      },
    });
  }
  async sendMailTemplate({ template, subject, payload }) {}
  async sendOtp() {}
}
module.exports = Email;
