require("dotenv").config();

const DB_URI = "mongodb+srv://";
const PORT = 8009;
const Bearer_PINATA_JWT =
  "Bearer eyJhbGciOiJIUzI1NiIsITRkZTUtYTMxMS0yYmqr96m-qhyz-HbS34lnk";

module.exports = {
  PORT: process.env.PORT || PORT,
  DB_URI: DB_URI,
  Bearer_PINATA_JWT: Bearer_PINATA_JWT,
};
