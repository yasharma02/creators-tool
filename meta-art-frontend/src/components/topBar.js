import { useEffect, useState } from "react";

const TopBar = (props) => {
  const [walletAddress, setWallet] = useState("");
  // const [status, setStatus] = useState("");
  const [chainStatus, setChainStatus] = useState("");
  const chainMap = new Map([
    ["0x5", "GOERLI_TESTNET"],
    ["0x1", "ETH_MAINNET"],
    //["0x38", "BINANCE_SMART_CHAIN"],
    ["0x89", "POLYGON_MAINNET"],
    //["0xa86a", "AVALANCHE_NETWORK"],
    ["0x13881", "MUMBAI_TESTNET"],
    ["0x3", "ROPSTEN_TESTNET"],
    ["0x4", "RINKEBY_TESTNET"],
    ["0x2a", "KOVAN_TESTNET"],
  ]);

  useEffect(() => {
    async function fetchData() {
      const { address, status } = await getCurrentWalletConnected();
      // check chain id
      const chainId = await checkCurrentChainId();
      var chainStatusString;
      if (chainMap.has(chainId)) {
        chainStatusString = `Chain: ${chainMap.get(
          chainId
        )} | ChainId: ${chainId}`;
      } else {
        chainStatusString = `Chain: Unknown chain | ChainId: ${chainId}`;
      }
      setChainStatus(chainStatusString);

      setWallet(address);
      // setStatus(status);

      addWalletListener();
      addChainListener();
    }
    fetchData();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          // setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          // setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      //   setStatus(
      //     <p>
      //       {" "}
      //       🦊{" "}
      //       <a target="_blank" href={`https://metamask.io/download.html`}>
      //         You must install Metamask, a virtual Ethereum wallet, in your
      //         browser.
      //       </a>
      //     </p>
      //   );
    }
  }

  function addChainListener() {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId) => {
        var chainStatusString;
        if (chainMap.has(chainId)) {
          chainStatusString = `Chain: ${chainMap.get(
            chainId
          )} | ChainId: ${chainId}`;
        } else {
          chainStatusString = `Chain: Unknown chain | ChainId: ${chainId}`;
        }
        setChainStatus(chainStatusString);
      });
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    // setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  return (
    <div className="TopBar">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <p id="chainStatus" style={{ color: "red" }}>
        {chainStatus}
      </p>
      <h1 id="title">🧙‍♂️ Welcome anon</h1>
      <p id="topBarDescription">
        Create art collections | Upload to IPFS | Generate Metadata
      </p>
      {/* <p id="status" style={{ color: "red" }}>
        {status}
        </p> */}
    </div>
  );
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const checkCurrentChainId = async () => {
  if (window.ethereum) {
    try {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      // if (currentChainId != targetNetworkId) {
      //   await window.ethereum.request({
      //     method: "wallet_switchEthereumChain",
      //     params: [{ chainId: targetNetworkId }],
      //   });
      // }

      return currentChainId;
    } catch (err) {
      return "none";
    }
  } else {
    return "none";
  }
};

export default TopBar;
