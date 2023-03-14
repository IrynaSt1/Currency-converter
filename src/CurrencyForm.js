import "./CurrencyForm.css"

function CurrencyForm(props) {
  const {
    currency,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div className="field">
      <input className="input-field"
        type="number"
        step="1"
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currency.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyForm;
