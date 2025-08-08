const cryptoContainer = document.getElementById("crypto-container");

const cryptos = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "dogecoin", symbol: "DOGE" },
  { id: "solana", symbol: "SOL" },
  { id: "cardano", symbol: "ADA" }
];

async function fetchPrices() {
  const ids = cryptos.map(c => c.id).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    cryptoContainer.innerHTML = ""; // Clear previous cards

    cryptos.forEach(crypto => {
      const price = data[crypto.id].usd;
      const change = data[crypto.id].usd_24h_change;
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="crypto-name">${crypto.symbol}</div>
        <div class="crypto-price">$${price.toFixed(2)}</div>
        <div class="${change >= 0 ? 'price-up' : 'price-down'}">
          ${change.toFixed(2)}%
        </div>
      `;

      cryptoContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to fetch crypto data:", error);
    cryptoContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
  }
}

fetchPrices();
setInterval(fetchPrices, 30000); // Refresh every 30 sec
