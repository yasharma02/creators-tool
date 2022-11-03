const express = require("express");
const { PORT } = require("./utils/config.js");
const {
  saveToDB,
  getByUserAddress,
  findByIdAndUpdate,
} = require("./dbService");
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
      data: resp.data,
    });
  } else {
    return res.json({
      message: resp.message,
      success: resp.success,
      code: "500",
      data: resp.data,
    });
  }
});

app.put("/metadata/:id", upload.single("file"), async (req, res) => {
  const id = req.params["id"];
  const body = req.body;
  console.log(body);
  var pinataRes = await uploadToPinata(req);
  var newFileURL = "";
  if (pinataRes != null && Object.keys(pinataRes).length != 0) {
    newFileURL = `https://gateway.pinata.cloud/ipfs/${pinataRes.data.IpfsHash}`;
  } else if (pinataRes == null) {
    return res.json({
      message: "error",
      success: false,
      code: "500",
      data: null,
    });
  }

  var resp = await findByIdAndUpdate(
    id,
    newFileURL,
    body.description,
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
      data: resp.data,
    });
  } else {
    return res.json({
      message: resp.message,
      success: resp.success,
      code: "500",
      data: resp.data,
    });
  }
});

app.get("/metadata/:userPublicAddress", async (req, res) => {
  const userPublicAddress = req.params["userPublicAddress"]; // req.query.userPublicAddress
  console.log(userPublicAddress);
  console.log(req.params);
  var fetchResult = await getByUserAddress(userPublicAddress);

  console.log(fetchResult);
  if (fetchResult.success) {
    return res.json({
      message: fetchResult.message,
      success: fetchResult.success,
      code: "200",
      userArtList: fetchResult.userArtList,
    });
  } else {
    return res.json({
      message: fetchResult.message,
      success: fetchResult.success,
      code: "500",
      userArtList: [],
    });
  }
});

app.listen(PORT, () => {
  console.log(`App Started on port ${PORT}`);
});
