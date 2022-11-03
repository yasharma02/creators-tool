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
  res.data = {};

  try {
    const conn = await connectDB();
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    var newFileURL = "";
    if (pinataRes != null && Object.keys(pinataRes).length != 0) {
      newFileURL = `https://gateway.pinata.cloud/ipfs/${pinataRes.data.IpfsHash}`;
    }

    var fetchResult = await getByUserAddress(userPublicAddress);
    console.log("token id", fetchResult.userArtList.length + 1);

    var metadataJSON = new Object();
    metadataJSON.description = description;
    metadataJSON.title = title;
    metadataJSON.artistName = artistName;
    metadataJSON.properties = JSON.parse(properties);
    metadataJSON.fileURL = newFileURL;
    metadataJSON.tokenId = fetchResult.userArtList.length + 1;

    const doc = await ArtDetailsModel.create({
      metadataJSON: JSON.stringify(metadataJSON),
      userPublicAddress: userPublicAddress,
    });
    console.log(doc);
    res.data = doc;
    var docId = doc._id;
    console.log(docId);
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

const getByUserAddress = async (userPublicAddress) => {
  const res = new Object();
  res.success = false;
  res.message = "";
  res.userArtList = [];

  try {
    const conn = await connectDB();
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // await TxnDetailsModel.deleteOne({ _id: txn._id });
    var userArtList = new Object();

    userArtList = await ArtDetailsModel.find({
      userPublicAddress: userPublicAddress,
    });
    // console.log(userArtList);
    res.userArtList = userArtList;

    // const oldEntry = await ArtDetailsModel.findByIdAndUpdate(docId, {
    //   accountsObject: accountsObject,
    //   ethToAccountsTransferReceiptObj: ethToAccountsTransferReceiptObj,
    // });
    // const newEntry = await ArtDetailsModel.findById(docId);
  } catch (error) {
    console.log(error);
    res.success = false;
    res.message = error.message;
    return res;
  }
  res.success = true;
  res.message = "Fetched from database";
  return res;
};

const findByIdAndUpdate = async (
  id,
  newFileURL,
  description,
  title,
  artistName,
  properties
) => {
  const res = new Object();
  res.success = false;
  res.message = "";
  res.data = {};

  try {
    const conn = await connectDB();
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    var data = await ArtDetailsModel.findById(id);
    console.log(data);
    var oldMetadata = JSON.parse(data.metadataJSON);
    if (newFileURL != "") {
      oldMetadata.fileURL = newFileURL;
    }
    oldMetadata.description = description;
    oldMetadata.title = title;
    oldMetadata.artistName = artistName;
    oldMetadata.properties = JSON.parse(properties);

    const oldEntry = await ArtDetailsModel.findByIdAndUpdate(id, {
      metadataJSON: JSON.stringify(oldMetadata),
    });
    console.log(oldEntry);
    const newEntry = await ArtDetailsModel.findById(id);
    console.log(newEntry);

    res.data = newEntry;
  } catch (error) {
    console.log(error);
    res.success = false;
    res.message = error.message;
    return res;
  }
  res.success = true;
  res.message = "Updated";
  return res;
};

module.exports = { saveToDB, getByUserAddress, findByIdAndUpdate };
