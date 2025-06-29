import {
  OKXTonConnect,
  OkxConnectError,
  OKX_CONNECT_ERROR_CODES,
  Account,
  Wallet,
} from "okxconnect";

document.addEventListener("DOMContentLoaded", () => {
  const connectButton = document.getElementById("connectButton");
  const showAddressButton = document.getElementById("accountAddress");
  const disconnectPhone = document.getElementById("disconnectPhone");
  if (window.innerWidth <= 768) {
    connectButton.style.display = "block";
  }

  const okxTonConnect = new OKXTonConnect({
    metaData: {
      name: "Cherry Bot",
      icon: "https://storage.cherrybot.ai/favicon.ico",
    },
  });
  const assignWallet = async () => {
    try {
      var connected = okxTonConnect.connected;
      console.log("connect : ", connected);

      if (connected === true) {
        var account = okxTonConnect.account.address;

        connectButton.style.display = "none";
        showAddressButton.style.display = "block";
        disconnectPhone.style.display = "block";
        showAddressButton.innerHTML = `${formatAddress(account)}`;
      }
    } catch (error) {
      if (error instanceof OkxConnectError) {
        if (error.code === OKX_CONNECT_ERROR_CODES.USER_REJECTS_ERROR) {
          alert("User rejected the connection");
        } else if (
          error.code === OKX_CONNECT_ERROR_CODES.ALREADY_CONNECTED_ERROR
        ) {
          alert("You are already connected");
          assignWallet();
        } else {
          alert(error.message);
        }
      } else {
        alert(error.message);
      }
    }
  };

  // Helper function to format address
  function formatAddress(address) {
    return `${address.slice(0, 3)}...${address.slice(-3)}`;
  }

  // Initialize OKXTonConnect

  // Function to connect to the wallet
  const connectToWallet = async () => {
    try {
      await okxTonConnect.connect({
        tonProof: "signmessage",
        redirect: "https://www.cherrybot.net",
        openUniversalLink: true,
      });
    } catch (error) {
      if (error instanceof OkxConnectError) {
        if (error.code === OKX_CONNECT_ERROR_CODES.USER_REJECTS_ERROR) {
          alert("User rejected the connection");
        } else if (
          error.code === OKX_CONNECT_ERROR_CODES.ALREADY_CONNECTED_ERROR
        ) {
          assignWallet();
          alert("You are already connected");
        } else {
          alert(error.message);
        }
      } else {
        alert(error.message);
      }
    }
  };

  // Function to disconnect from the wallet
  const disconnectToWallet = async () => {
    try {
      await okxTonConnect.disconnect();
      connectButton.style.display = "block";
      showAddressButton.style.display = "none";
      disconnectPhone.style.display = "none";
    } catch (error) {
      if (error instanceof OkxConnectError) {
        if (error.code === OKX_CONNECT_ERROR_CODES.NOT_CONNECTED_ERROR) {
          alert("You are not connected");
        } else {
          alert(error.message);
        }
      } else {
        alert(error.message);
      }
    }
  };

  // Attach event listeners
  connectButton.addEventListener("click", connectToWallet);
  disconnectPhone.addEventListener("click", disconnectToWallet);
  window.addEventListener("load", async () => {
    try {
      await okxTonConnect.restoreConnection();
      assignWallet();
    } catch (error) {
      console.error(error);
    }
  });
});
