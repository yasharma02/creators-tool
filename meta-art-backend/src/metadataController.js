const express = require("express");
const { PORT } = require("./utils/config.js");
const { saveToDB } = require("./dbService");
const { uploadToPinata } = require("./ipfsService");
const cors = require("cors");
const app = express();
var multer = require("multer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname, "public"));
// app.use(morgan('dev'));
// for parsing multipart/form-data
// app.use(upload.array());
// app.use(upload.single("file"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage: storage });
// var upload = multer({ dest: "./images" });

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) res.status(500).send(err.message);
  else next(err);
});

app.post("/metadata", upload.single("file"), async (req, res) => {
  const body = req.body;
  console.log(body);
  var pinataRes = await uploadToPinata(req);

  var resp = await saveToDB(
    pinataRes,
    body.description,
    body.userPublicAddress,
    body.title,
    body.artistName,
    body.properties
  );
  console.log(resp);
  if (resp.success) {
    return res.json({
      message: resp.message,
      success: resp.success,
      code: "200",
    });
  } else {
    return res.json({
      message: resp.message,
      success: resp.success,
      code: "500",
    });
  }
});

app.get("/metadata/:userPublicAddress", (req, res) => {
  const userPublicAddress = req.params["userPublicAddress"];
});

app.listen(PORT, () => {
  console.log(`App Started on port ${PORT}`);
});
