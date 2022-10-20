const ArtPropertiesBody = () => {
  return (
    <div className="ArtPropertiesBody">
      <div id="artPropertiesBody">
        <div
          class="flex items-center py-2 border-b-2 list-el"
          id="artPropertiesBodyContents"
        >
          <div class="w-full flex flex-col items-stretch justify-between">
            <div class="flex justify-between items-center">
              <input autofocus="" placeholder="PROPERTY NAME" />
              {/* <span>TEXT</span> */}
            </div>
            <div class="w-full flex justify-between items-center">
              <input type="text" placeholder="Value" />
            </div>
          </div>
          <div id="artPropertiesButton">
            <button
              type="button"
              class="inline-flex items-center p-1 border border-transparent text-xs font-medium text-red-700 rounded-full bg-red-100 hover:bg-red-300 transition duration-300 ease-in-out"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtPropertiesBody;
