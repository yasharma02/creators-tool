// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/topBar";
import Collection from "./pages/collection";
import ArtPage from "./pages/art";
import CollectionTile from "./components/collectionTile";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <TopBar />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <body className="App-body">
        <br></br>
        <Router>
          <Routes>
            <Route exact path="/" element={<ArtPage />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/collectiontile" element={<CollectionTile />} />
            {/* <Route path="/batch" element={<Batch />} /> */}
          </Routes>
        </Router>
        {/* <br></br>
        <CollectionTile />
      <br></br> */}
      </body>
    </div>
  );
}

export default App;
