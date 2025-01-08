const databaseUrl = process.env.DATABASE_URL;
const serverPort = process.env.NODE_PORT;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresAt = process.env.JWT_EXPIRES_AT;
const mailEmail = process.env.MAIL_EMAIL;
const mailPass = process.env.MAIL_PASS;

module.exports = {
  databaseUrl,
  serverPort,
  jwtSecretKey,
  jwtExpiresAt,
  mailEmail,
  mailPass,
};
