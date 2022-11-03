import { useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";
import { metadataPostToServer } from "../utils/sendRequests";

const CollectionTile = (props) => {
  // console.log(props.parentToChild);
  // console.log(metadata); a href={`/artpage/${props.parentToChild._id}`}
  const metadata = JSON.parse(props.parentToChild.metadataJSON);
  const [chain, setChain] = useState("chain:na");

  const duplicate = async () => {
    var parentCallBackData = "placeholder data";

    document.getElementById("artDuplicateButton").disabled = true;
    var result;

    var data = new FormData();
    // data.append("file", file);
    console.log(props.parentToChild.userPublicAddress);

    data.append("description", metadata.description);
    data.append("userPublicAddress", props.parentToChild.userPublicAddress);
    data.append("title", metadata.title);
    data.append("artistName", metadata.artistName);
    data.append("properties", JSON.stringify(metadata.properties));

    result = await metadataPostToServer(data);
    console.log(result.responseSuccess);

    document.getElementById("artDuplicateButton").disabled = false;
    console.log(result.responseData);

    props.parentCallback(parentCallBackData);
  };

  return (
    <div className="CollectionTile">
      <Link to={`/artpage/${props.parentToChild._id}`} id="collectionTileLink">
        <div>
          <div id="collectionTileImgDiv">
            <img
              src={metadata.fileURL}
              alt="batch of J"
              id="collectionTileImg"
            />
          </div>
          <div id="collectionTileDesc">
            <span> {chain} </span>
            <h2>{metadata.title}</h2>
          </div>
          <div id="collectionTileTokenDesc">
            <div>
              <h2> Token ID </h2>
            </div>
            <span> {metadata.tokenId} </span>
          </div>
        </div>
      </Link>
      <div id="collectionTileButton">
        <button id="artDuplicateButton" onClick={duplicate}>
          <span>Duplicate</span>
        </button>
      </div>
    </div>
  );
};

export default CollectionTile;
