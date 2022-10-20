import ArtPropertiesBody from "../components/artProperties";

const ArtPage = () => {
  return (
    <div className="ArtPage">
      <header id="artPageHeader">
        <div id="artPageHeaderDiv">
          <a href="/collectiontile" id="artPageHeaderGoBackLink">
            <span id="artPageHeaderText">Go back</span>
          </a>
        </div>
      </header>
      <br></br>
      <main>
        <div id="artPageBody">
          <div id="artDetails">
            <div id="artFile">
              <div id="artFileContainer">
                <label id="artFileContents">
                  <button id="artFileRemoveButton">Remove</button>
                  <input
                    id="artFile-input"
                    name="artwork"
                    type="file"
                    accept=".png,.jpeg,.jpg,.gif,.tif,.tiff,.raw,.svg"
                  />
                  <img
                    id="artFile-image"
                    src="https://assets.manifold.xyz/image/upload/c_thumb,q_80,w_1000/v1665559529/0492d12f97b840fd07d8dd19bc2f5f29b178ed88a2b022cbe8ca31561f454685.jpg"
                  />
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
                    class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    {" "}
                    New property{" "}
                  </button>
                </div>
              </div>
              <div>
                <ArtPropertiesBody />
              </div>
            </div>
          </div>
          <div id="artSideBox">
            <div id="artSideBoxContents">
              <button id="artSaveButton">Save</button>
              <h3 id="artPageStatus"> Status </h3>
              <p id="artPageStatusValue">Saved </p>
              <div id="artLinks">
                <h3 id="artLinkText"> Preview Links </h3>
                <a id="artMetadataLink" href="/collectiontile">
                  View Metadata
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtPage;
