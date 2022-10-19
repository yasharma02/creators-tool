import { NavLink as Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import CollectionTile from "../components/collectionTile";

const Collection = () => {
  return (
    <div className="Collection">
      <h1>GeeksforGeeks is a Computer Science portal for geeks.</h1>
      <p id="elementStatus">hello</p>
      <Link to="/batch">Contact Us</Link>
    </div>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://swapi.dev/api/people/", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {!isLoading &&
        data.map((person, index) => {
          return <h5 key={index}>{person.name}</h5>;
        })}
    </>
  );
};

export default Collection;
