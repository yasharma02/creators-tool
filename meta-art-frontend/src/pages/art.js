import ArtPropertiesBody from "../components/artProperties";
import { useEffect, useState, useContext } from "react";
// import walletContext from "../App";
import { NavLink as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  metadataPostToServer,
  metadataGetFromServer,
  metadataPutToServer,
} from "../utils/sendRequests";

const ArtPage = (props) => {
  var url = window.location.href;
  var index = url.lastIndexOf("/");
  var id = url.substring(index + 1);
  // console.log(id);

  const [data, setData] = useState({
    _id: "",
    userPublicAddress: "",
    metadataJSON: {
      description: "",
      title: "",
      artistName: "",
      properties: {},
      fileURL: "",
      tokenId: "",
    },
  });

  // useContext(walletContext)
  const navigate = useNavigate();
  const [status, setStatus] = useState("-");
  const [metadataValue, setMetadataValue] = useState("undefined");
  const [userPublicAddress, setUserPublicAddress] = useState(props.wallet);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [file, setFile] = useState();
  const [properties, setProperties] = useState([]);
  const [tokenId, setTokenId] = useState("");
  const [dbId, setDbId] = useState("");

  useEffect(() => {
    // will useeffect rewrite all fields with data from server while user is trying to update fields?
    if (id != "new") {
      metadataGetFromServer(userPublicAddress)
        .then((response) => {
          var matchingEntry = {};
          for (let index in response.userArtList) {
            if (response.userArtList[index]._id == id) {
              matchingEntry = response.userArtList[index];
              matchingEntry.metadataJSON = JSON.parse(
                matchingEntry.metadataJSON
              );
              // console.log(Object.keys(matchingEntry.metadataJSON.properties));
              console.log(matchingEntry);
            }
          }
          if (Object.keys(matchingEntry).length != 0) {
            // setData(matchingEntry);
            setMetadataValue(JSON.stringify(matchingEntry.metadataJSON));
            setUserPublicAddress(matchingEntry.userPublicAddress);
            setDescription(matchingEntry.metadataJSON.description);
            setTitle(matchingEntry.metadataJSON.title);
            setArtistName(matchingEntry.metadataJSON.artistName);
            setFileURL(matchingEntry.metadataJSON.fileURL);
            var tempArray = [];
            Object.keys(matchingEntry.metadataJSON.properties).map(
              (currentValue) => {
                tempArray.push({
                  key: currentValue,
                  value: matchingEntry.metadataJSON.properties[currentValue],
                });
              }
            );
            console.log(tempArray);
            setProperties(tempArray);
            // setProperties(matchingEntry.metadataJSON.properties);
            setTokenId(matchingEntry.metadataJSON.tokenId);
            setDbId(matchingEntry._id);
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const onImageChange = (event) => {
    const [tempFile] = event.target.files;
    setFile(event.target.files[0]);
    // console.log(tempFile);
    setFileURL(URL.createObjectURL(tempFile));
  };

  const handleCallback = (childData) => {
    // console.log(childData);
    var oldObj = properties[childData.index];
    properties[childData.index] = childData.new;
  };

  const addNewProperty = () => {
    console.log(properties);
    var newProps = JSON.parse(JSON.stringify(properties));
    // properties.map((currentValue) => {newProps.push()});
    newProps.push({
      key: "",
      value: "",
    });
    setProperties(newProps);
  };

  const fileRemove = () => {
    console.log(file);
    console.log(fileURL);
    setFileURL("");
    setFile();
  };

  const saveData = async () => {
    if (id == "new") {
      document.getElementById("artSaveButton").disabled = true;
      var result;

      var data = new FormData();
      data.append("file", file);
      var propertiesObj = {};
      properties.map((currentValue) => {
        if (currentValue.key != "") {
          propertiesObj[currentValue.key] = currentValue.value;
        }
      });
      console.log(userPublicAddress);

      data.append("description", description);
      data.append("userPublicAddress", userPublicAddress);
      data.append("title", title);
      data.append("artistName", artistName);
      data.append("properties", JSON.stringify(propertiesObj));

      result = await metadataPostToServer(data);
      setStatus(result.responseMessage);
      console.log(result.responseSuccess);

      document.getElementById("artSaveButton").disabled = false;
      if (result.responseCode == "200") {
        console.log(result.responseData);
        navigate(`/artpage/${result.responseData._id}`);
      }
    } else {
      document.getElementById("artSaveButton").disabled = true;
      var result;

      var data = new FormData();
      data.append("file", file);
      var propertiesObj = {};
      properties.map((currentValue) => {
        if (currentValue.key != "") {
          propertiesObj[currentValue.key] = currentValue.value;
        }
      });
      console.log(userPublicAddress);

      data.append("description", description);
      data.append("userPublicAddress", userPublicAddress);
      data.append("title", title);
      data.append("artistName", artistName);
      data.append("properties", JSON.stringify(propertiesObj));

      result = await metadataPutToServer(data, dbId);
      setStatus(result.responseMessage);
      console.log(result.responseSuccess);

      document.getElementById("artSaveButton").disabled = false;
    }
  };

  return (
    <div className="ArtPage">
      <header id="artPageHeader">
        <div id="artPageHeaderDiv">
          <Link to="/" id="artPageHeaderGoBackLink">
            <span id="artPageHeaderText">Go back</span>
          </Link>
        </div>
      </header>
      <br></br>
      <main>
        <div id="artPageBody">
          <div id="artDetails">
            <div id="artFile">
              <div id="artFileContainer">
                <label id="artFileContents">
                  <button id="artFileRemoveButton" onClick={fileRemove}>
                    Remove
                  </button>
                  <input
                    id="artFile-input"
                    name="artwork"
                    type="file"
                    accept=".png,.jpeg,.jpg,.gif,.tif,.tiff,.raw,.svg"
                    onChange={(event) => onImageChange(event)}
                  />
                  <img id="artFile-image" src={fileURL} />
                </label>
              </div>
            </div>
            <div id="artMetadata">
              <div id="artTitle">
                <div id="artTitleContents">
                  <label id="artTitleText">Artwork title</label>
                  <br></br>
                  <input
                    type="text"
                    id="artTitleValue"
                    placeholder="E.g. Replicator"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
              </div>
              <div id="artAuthor">
                <div id="artAuthorTextContents">
                  <span id="artAuthorText">Created By</span>
                </div>
                <input
                  type="text"
                  id="artAuthorValue"
                  placeholder="E.g. Replicator"
                  value={artistName}
                  onChange={(event) => setArtistName(event.target.value)}
                />
              </div>
              <div id="artDescription">
                <div id="artDescriptionTextContents">
                  <span id="artDescriptionText">Description</span>
                </div>
                <textarea
                  id="artDescriptionValue"
                  rows="15"
                  placeholder="E.g. Chapter 2: Ink explosion - May 7, 1999"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div id="artProperties">
              <div
                id="artPropertiesHeader"
                class="p-4 flex justify-between items-center border-b-2"
              >
                <span
                  id="artPropertiesHeaderText"
                  class="text-xs uppercase font-bold"
                >
                  Properties
                </span>
                <div
                  class="relative inline-block text-left"
                  id="artPropertiesHeaderButtonDiv"
                >
                  <button
                    id="artPropertiesHeaderButton"
                    type="button"
                    onClick={addNewProperty}
                    class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    {" "}
                    New property{" "}
                  </button>
                </div>
              </div>
              <div id="artPropertiesBox">
                {properties.map((currentValue, index) => {
                  return (
                    <div>
                      <ArtPropertiesBody
                        parentToChild={{
                          key: currentValue.key,
                          value: currentValue.value,
                          index: index,
                        }}
                        parentCallback={handleCallback}
                      />
                      <br></br>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div id="artSideBox">
            <div id="artSideBoxContents">
              <button id="artSaveButton" onClick={saveData}>
                Save
              </button>
              <h3 id="artPageStatus"> Status </h3>
              <p id="artPageStatusValue">{status} </p>
              <div id="artLinks">
                <h3 id="artLinkText"> Preview Links </h3>
                <Link to="/metadata" state={metadataValue} id="artMetadataLink">
                  View Metadata
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtPage;
