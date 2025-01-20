const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
const { mailEmail, mailPass } = require("./credentials");

class Email {
  constructor(user) {
    this.to = user?.email;
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
  async sendMailTemplate({ template, subject, payload }) {
    const html = pug.renderFile(`${__dirname}/../views/pug/${template}.pug`, {
      payload,
      subject:`Hello ${this.name}!`,
    });
    // for those systems not supporting html
    const text = htmlToText.convert(html);
    const mail = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };
    return await this.createTransport().sendMail(mail);
  }
  async sendResetPassOtp(payload) {
    await this.sendMailTemplate({
      template: "userMessage",
      payload,
      subject: "Reset Password OTP Verification",
    });
  }
}
module.exports = Email;
