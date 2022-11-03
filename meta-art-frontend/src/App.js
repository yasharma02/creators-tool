import "./App.css";
import { useEffect, useState, createContext, Navigate } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/topBar";
import Collection from "./pages/collection";
import ArtPage from "./pages/art";
import Batch from "./pages/batch";
import Metadata from "./pages/metadata";
// import CollectionTile from "./components/collectionTile";
// const walletContext = createContext();

function App() {
  const [walletAddress, setWallet] = useState("");
  // const navigate = useNavigate();

  const handleCallback = (childData) => {
    console.log(childData);
    console.log(childData.wallet);
    setWallet(childData.wallet);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TopBar parentCallback={handleCallback} />
      </header>
      <body className="App-body">
        <br></br>
        <Router>
          <Routes>
            {/*<Route
              path="/collection"
              element={
                <>
                  {() => {
                    return <Navigate to="/collection" />;
                  }}
                </>
              }
            />*/}
            <Route
              exact
              path="/"
              element={<Collection wallet={walletAddress} />}
            />
            <Route
              path="/artpage/:id"
              element={<ArtPage wallet={walletAddress} />}
            />
            <Route path="/metadata" element={<Metadata />} />
            <Route path="/batch" element={<Batch />} />
          </Routes>
        </Router>
      </body>
    </div>
  );
}

export default App;
// export { walletContext };
