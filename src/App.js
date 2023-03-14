import { useEffect, useState } from "react";
import "./App.css";
import CurrencyForm from "./CurrencyForm";
import { TbArrowsSort } from "react-icons/tb";

const url = "https://api.apilayer.com/exchangerates_data/latest";

let myHeaders = new Headers();
myHeaders.append("apikey", "Wt1aZfrD9dOGsQ1yBfK4hhGHkDY7I3Fe");
let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function App() {
  const [currency, setCurrency] = useState(["EUR"]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [eurRate, setEurRate] = useState(null);
  const [usdRate, setUsdRate] = useState(null);

  let fromAmount, toAmount;
  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  useEffect(() => {
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const firstCurrency = Object.keys(result.rates)[0];
        setCurrency([...Object.keys(result.rates)]);
        setFromCurrency(result.base);
        setToCurrency(firstCurrency);
        setExchangeRate(result.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${url}?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
        .then((response) => response.json())
        .then((result) => setExchangeRate(result.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(`${url}?symbols=UAH&base=EUR`, requestOptions)
      .then((response) => response.json())
      .then((result) => setEurRate(result.rates.UAH));
    fetch(`${url}?symbols=UAH&base=USD`, requestOptions)
      .then((response) => response.json())
      .then((result) => setUsdRate(result.rates.UAH));
  }, []);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountFromCurrency(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="uah_rates">
          {eurRate && <div>EUR {eurRate.toFixed(2)}</div>}
          {usdRate && <div>USD {usdRate.toFixed(2)}</div>}
        </div>
      </header>
      <div className="card">
        <div className="card2">
          <div className="box">
            <h1>Currency Converter</h1>
            <CurrencyForm
              currency={currency}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
            <TbArrowsSort className="arrow" />
            <CurrencyForm
              currency={currency}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
