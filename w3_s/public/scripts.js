document
  .getElementById("withdraw-wallet")
  .addEventListener("click", function () {
    window.location.href = "balance.html";
  });

document.addEventListener("DOMContentLoaded", function () {
  const foodItems = document.querySelectorAll(".food-item");

  foodItems.forEach((item) => {
    const text = item.getAttribute("data-text");
    const description = item.getAttribute("data-description");
    const link = item.getAttribute("data-link");

    const foodInfo = document.createElement("div");
    foodInfo.classList.add("food-info");

    foodInfo.innerHTML = `
            <a href="${link}" class="food-link">
                <h3>${text}</h3>
                <p>${description}</p>
            </a>
        `;

    item.appendChild(foodInfo);
  });
});

let clientAddress;

const isWalletConnected = () => {
  return localStorage.getItem("clientAddress");
};

window.onload = () => {
  if (isWalletConnected()) {
    console.log("wallet is conected");

    document.getElementById("connect-wallet").innerText = "Connected";
  }
};

async function connectWallet() {
  console.log(626262);
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request connection to MetaMask only when the button is clicked
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get the connected wallet's signer
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Update button text to "Connected"
    document.getElementById("connect-wallet").innerText = "Connected";

    // Store the connected address in localStorage
    localStorage.setItem("clientAddress", address);
    console.log("Connected wallet address:", address);
  } catch (error) {
    console.error("Error connecting to MetaMask:");
  }
}
