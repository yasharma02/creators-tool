import { NavLink as Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
import CollectionTile from "../components/collectionTile";
import { metadataGetFromServer } from "../utils/sendRequests";

const Collection = (props) => {
  // const walletState = useLocation();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [userPublicAddress, setUserPublicAddress] = useState(props.wallet);

  useEffect(() => {
    metadataGetFromServer(userPublicAddress)
      .then((response) => {
        console.log(response.responseMessage);
        if (response.responseSuccess) {
          setData(response.userArtList);
        }
        console.log(response.userArtList);

        console.log(data); // for some reason value of data here is one iteration old and not present value, but in html and addtodo below value is current
        // document.getElementById("collectionsObj").
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const handleCallback = (childData) => {
    // console.log(childData);
    setRefresh(!refresh);
  };

  return (
    <div className="Collection">
      <div>
        <h1>GRU</h1>
        <button id="createNewArtButton" onClick={createNew}>
          <span>Create New</span>
        </button>
        <div id="collectionsObj">
          {data.map((currentValue) => {
            var id = JSON.parse(currentValue.metadataJSON)._id;
            return (
              <div key={id}>
                <CollectionTile
                  parentToChild={currentValue}
                  parentCallback={handleCallback}
                />
                <br></br>
              </div>
            );
          })}
        </div>
        {/*<p id="elementStatus">hello</p>
        <button value="Task4" onClick={addTodo}>
          {" "}
          Do Task 4
        </button>
        <button onClick={refresh}>
          <span>Refresh</span>
        </button>*/}
        <Link to="/batch">Contact Us</Link>
      </div>
    </div>
  );

  function createNew() {
    // navigate("/artpage/new", { walletState: { wallet: "undefined" } });
    navigate("/artpage/new");
  }

  // function refresh() {
  //    setUserPublicAddress("null");
  //    navigate("/");
  // }

  // function addTodo(e) {
  //   const todoItem = e.target.value;
  //   console.log(todoItem);
  //   console.log(data);
  //   {
  //     data.map((currentValue) => {
  //       console.log(
  //         currentValue,
  //         currentValue._id,
  //         currentValue.metadataJSON,
  //         currentValue.userPublicAddress
  //       );
  //     });
  //   }
  // }
};

export default Collection;
