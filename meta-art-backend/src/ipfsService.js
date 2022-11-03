const { Bearer_PINATA_JWT } = require("./utils/config.js");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
// import { create } from "ipfs-http-client";
// const client = create("https://ipfs.infura.io:5001/api/v0");

const uploadToPinata = async (req) => {
  var data = new FormData();
  var res = {};
  try {
    if (req.file) {
      console.log("file received");
      console.log(req.file);

      data.append(
        "file",
        // req.file
        fs.createReadStream(
          `/Users/yasharma02/zoCode/Metadata-Generator/meta-art-backend/images/${req.file.filename}`
        )
      );
      data.append("pinataOptions", '{"cidVersion": 1}');
      data.append(
        "pinataMetadata",
        '{"name": "MyFish", "keyvalues": {"company": "Finata"}}'
      );

      var config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        headers: {
          Authorization: Bearer_PINATA_JWT,
          ...data.getHeaders(),
        },
        data: data,
      };
      res = await axios(config);

      console.log(res.data);
      // const added = await client.add(file);
      // console.log("file path", added.path);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  return res;
};

module.exports = { uploadToPinata };

// const form = new FormData();
// form.append('title', title);
// form.append('file', file);

// const resp = await axios.post('http://localhost:3000/upload', form, {
//   headers: {
//     ...form.getHeaders(),
//   }
// });

// if (resp.status === 200) {
//   return 'Upload complete';
// }

// app.post('/', function (req, res, next) {
//     res.send(JSON.stringify(req.body));
//   });
