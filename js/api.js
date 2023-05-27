const yahooFinance = require("yahoo-finance2").default;
async function getQuote(symbolQuote) {


let divSymbol = document.getElementById("symbol");
let divPrice = document.getElementById("price");
let divSpread = document.getElementById("spread");
let divchangePct = document.getElementById("changePct");
  const symbol = symbolQuote.toUpperCase();
  let data;
  try {
    data = await yahooFinance.quoteSummary(symbol);
    const price = data.price.regularMarketPrice;
    const spread = data.summaryDetail.ask - data.summaryDetail.bid;
    const prevClose = data.price.regularMarketPreviousClose;
    const changePct = ((price - prevClose) / prevClose) * 100;
    let response = {
      symbol: symbol,
      price: parseFloat(price.toFixed(2)),
      spread: parseFloat(spread.toFixed(2)),
      changePct: parseFloat(changePct.toFixed(2)),
    };
    console.log(response)
    divSymbol.innerHTML = response.symbol;
    divPrice.innerHTML = response.price;
    divSpread.innerHTML = response.spread;
    divchangePct.innerHTML = response.changePct;

    return response;
  } catch (error) {
    let errorMessage = {
      status: "error",
      payload: { error: error, message: error.message },
    };
    console.log(errorMessage);
  }
};
let txtSymbolQuote = document.getElementById("symbolQuote");
let btnGetQuote = document.getElementById("btnGetQuote");
btnGetQuote.addEventListener("click", getQuote(txtSymbolQuote.value));

/*  setInterval(getQuote, 60000);  */

/* app.get("/stock/:symbol", async (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    let data;
    try {
      data = await yahooFinance.quoteSummary(symbol);
      const price = data.price.regularMarketPrice;
      const spread = data.summaryDetail.ask - data.summaryDetail.bid;
      const prevClose = data.price.regularMarketPreviousClose;
      const changePct = ((price - prevClose) / prevClose) * 100;
      res.json({
        symbol: symbol,
        price: parseFloat(price.toFixed(2)),
        spread: parseFloat(spread.toFixed(2)),
        changePct: parseFloat(changePct.toFixed(2)),
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        payload: { error: error, message: error.message },
      });
    }
  }); */
