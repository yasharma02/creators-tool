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
      <main>
        <div id="artPageBody">
          <div id="artDetails">
            <div id="artFile"></div>
            <div id="artMetadata"></div>
            <div id="artProperties"></div>
          </div>
          <div id="artSideBox">
            <div id="artSideBoxContents">
              <button id="artSaveButton">Save</button>
              <h1 id="artPageStatus"> Status </h1>
              <p id="artPageStatusValue">Saved </p>
              <div id="artLinks">
                <h1 id="artLinkText"> Preview Links </h1>
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
