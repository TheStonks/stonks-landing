import Chart from "chart.js/auto";
import roadmapData from '../docs/roadmap.json';

// HEADER
const hamburgerBtn = document.querySelector(".mobile-menu__button");
const header = document.getElementById("header");
const overlay = document.querySelector(".overlay");

hamburgerBtn.addEventListener("click", () => {
  header.classList.toggle("active");
  overlay.classList.toggle("active");
});


//CREATE CRYPTO PRICE LIST ITEM
const cryptoList = document.querySelector(".crypto-prices__list");
const cryptoChartChange = document.querySelector('.chart__price-change');

const createCryptoPriceListItem = (crypto, cryptoName) => {

  const li = document.createElement("li");
  const cryptoPriceEl = document.createElement("p");
  const cryptoChangeEl = document.createElement("p");

  const cryptoChangeClasses =
    crypto.usd_24h_change > 0
      ? ["crypto-prices__change"]
      : ["crypto-prices__change red"];

  cryptoPriceEl.classList.add("crypto-prices__price");
  cryptoChangeEl.classList = cryptoChangeClasses;


  const cryptoChangeSign = crypto.usd_24h_change > 0 ? "+" : "";
  cryptoChangeEl.innerText = `${cryptoChangeSign}${crypto.usd_24h_change.toFixed(
    2
    )}% / 24h`;

  li.setAttribute('data-crypto-name', cryptoName);

  let ticker;

  switch (cryptoName) {
    case "binancecoin":
      ticker = "BNB $";
      fetchCryptoChartData(cryptoName);
      cryptoChartChange.innerHTML = '';
      cryptoChartChange.append(cryptoChangeEl.cloneNode(true));
      break;
    case "bitcoin":
      ticker = "BTC $";
      break;
    case "ethereum":
      ticker = "ETH $";
  }

  cryptoPriceEl.innerText = `${ticker}  ${crypto.usd}`;
  
  li.append(cryptoPriceEl);
  li.append(cryptoChangeEl);
  cryptoList.append(li);
  
  li.addEventListener('click', () => {
    if(cryptoChart){
      cryptoChart.destroy();
    }
    fetchCryptoChartData(cryptoName);
    cryptoChartChange.innerHTML = '';
    cryptoChartChange.append(cryptoChangeEl.cloneNode(true));
  });
  
};

// FETCHING CRYPTO-PRICES

const coinGeckoURL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false&precision=0";

const fetchCryptoPrices = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();

    for (const crypto in data) {
      createCryptoPriceListItem(data[crypto], crypto);
    }
  } catch (error) {
    console.error(`Could not get data: ${error}`);
  }
};

if(cryptoList){
  fetchCryptoPrices(coinGeckoURL);
}

// FETCHING CRYPTO PRICE FOR CHART

const ctx = document.getElementById("chart");

const fetchCryptoChartData = async (cryptoName) => {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=1&interval=1h`);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();

    let timeStamp = [];
    let cryptoHistoricPrices = [];

    data.prices.forEach((price) => {
      timeStamp.push(price[0]);
    });

    data.prices.forEach((price) => {
      cryptoHistoricPrices.push(price[1]);
    });

    drawChart(timeStamp, cryptoHistoricPrices);
  } catch (error) {
    console.error(`Could not get data: ${error}`);
  }
};

// DRAW CHART
let cryptoChart;

const drawChart = (labels, data) => {

  const ctx2d = ctx.getContext("2d");

  ctx2d.canvas.height = 150;

  const gradient = ctx2d.createLinearGradient(0, 0, 0, 150);
  gradient.addColorStop(0, "#24264F");
  gradient.addColorStop(0.15, "#24264F");
  gradient.addColorStop(1, "#1C1F37");

  cryptoChart = new Chart(ctx2d, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          fill: true,
          borderColor: "#98A3FF",
          backgroundColor: gradient,
          borderWidth: 2,
          tension: 0.4,
          drawActiveElementsOnTop: false,
        },
      ],
    },
    options: {
      events: [],
      plugins: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
      elements: {
        point: {
          pointStyle: "none",
          radius: 0,
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
    },
  });
};



// ROADMAP
const roadmapList = document.querySelector(".roadmap__list");

const createRoadmapItem = (state, title, description) => {
  const li = document.createElement("li");
  const roadmapTitle = document.createElement("h2");
  const roadmapDesc = document.createElement("p");

  li.classList.add(state);
  roadmapTitle.innerText = title;
  roadmapDesc.innerText = description;

  li.append(roadmapTitle);
  li.append(roadmapDesc);
  roadmapList.append(li);
}

if(roadmapList){
roadmapData.forEach(data => {
  const state = data.attributes.state;
  const title = data.attributes.title;
  const description = data.attributes.description;

  createRoadmapItem(state, title, description);
});
}