import { useEffect, useState } from "react";

const ArtPropertiesBody = (props) => {
  const [key, setKey] = useState(props.parentToChild.key);
  const [value, setValue] = useState(props.parentToChild.value);

  // console.log(props.parentToChild.key);
  const onKeyChange = (event) => {
    var parentCallBackData = {
      old: { key: key, value: value },
      new: { key: event.target.value, value: value },
      index: props.parentToChild.index,
    };
    setKey(event.target.value);
    props.parentCallback(parentCallBackData);
  };

  const onValueChange = (event) => {
    var parentCallBackData = {
      old: { key: key, value: value },
      new: { key: key, value: event.target.value },
      index: props.parentToChild.index,
    };
    setValue(event.target.value);
    props.parentCallback(parentCallBackData);
  };

  const clearProperty = () => {
    document.getElementById("artPropertyKey").value = "";
    document.getElementById("artPropertyValue").value = "";
    var parentCallBackData = {
      old: { key: key, value: value },
      new: { key: "", value: "" },
      index: props.parentToChild.index,
    };
    setKey("");
    setValue("");
    props.parentCallback(parentCallBackData);
  };

  return (
    <div className="ArtPropertiesBody">
      <div id="artPropertiesBody">
        <div
          class="flex items-center py-2 border-b-2 list-el"
          id="artPropertiesBodyContents"
        >
          <div class="w-full flex flex-col items-stretch justify-between">
            <div class="flex justify-between items-center">
              <input
                id="artPropertyKey"
                autofocus=""
                placeholder="PROPERTY NAME"
                value={key}
                onChange={(event) => onKeyChange(event)}
              />
              {/* <span>TEXT</span> */}
            </div>
            <div class="w-full flex justify-between items-center">
              <input
                id="artPropertyValue"
                type="text"
                placeholder="Value"
                value={value}
                onChange={(event) => onValueChange(event)}
              />
            </div>
          </div>
          <div id="artPropertiesButton">
            <button
              type="button"
              onClick={clearProperty}
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
