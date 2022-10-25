const { connectDB } = require("./utils/connectDB.js");
const { ArtDetailsModel } = require("./models/artDetails.js");

const saveToDB = async (
  pinataRes,
  description,
  userPublicAddress,
  title,
  artistName,
  properties
) => {
  const res = new Object();
  res.success = false;
  res.message = "";

  try {
    const conn = await connectDB();
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // await TxnDetailsModel.deleteOne({ _id: txn._id });
    var metadataJSON = new Object();
    metadataJSON.description = description;
    metadataJSON.title = title;
    metadataJSON.artistName = artistName;
    metadataJSON.properties = properties;
    metadataJSON.fileURL = `https://gateway.pinata.cloud/ipfs/${pinataRes.IpfsHash}`;
    metadataJSON.tokenId = 1;

    const doc = await ArtDetailsModel.create({
      metadataJSON: JSON.stringify(metadataJSON),
      userPublicAddress: userPublicAddress,
    });
    console.log(doc);

    var docId = doc._id;
    console.log(docId);
    // const oldEntry = await ArtDetailsModel.findByIdAndUpdate(docId, {
    //   accountsObject: accountsObject,
    //   ethToAccountsTransferReceiptObj: ethToAccountsTransferReceiptObj,
    // });
    // console.log("oldEntry: ", oldEntry);
    // const newEntry = await ArtDetailsModel.findById(docId);
    // console.log("newEntry: ", newEntry);
  } catch (error) {
    console.log(error);
    res.success = false;
    res.message = error.message;
    return res;
  }
  res.success = true;
  res.message = "Saved to database";
  return res;
};

module.exports = { saveToDB };
