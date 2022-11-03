import { useLocation } from "react-router-dom";

const Metadata = () => {
  const metadata = useLocation();
  const metadataValue = JSON.parse(metadata.state);
  console.log(metadataValue);

  return (
    <div>
      <textarea
        id="artMetadataValue"
        rows="15"
        placeholder="E.g. Chapter 2: Ink explosion - May 7, 1999"
        value={metadata.state}
      ></textarea>
    </div>
  );
};

export default Metadata;
