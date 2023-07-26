type CoinsListProps = {
  text: string
  to: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  disabled: boolean
}
export default function CoinsList({
  text,
  to,
  onChange,
  disabled = false,
}: CoinsListProps) {
  const coins = [
    { name: 'Dólar Comercial', code: 'USD', id: 1 },
    { name: 'Euro', code: 'EUR', id: 2 },
    { name: 'Real Brasileiro', code: 'BRL', id: 3 },
    { name: 'Iene Japonês', code: 'JPY', id: 4 },
    { name: 'Franco Suíço', code: 'CHF', id: 5 },
    { name: 'Libra Esterlina', code: 'GBP', id: 6 },
    { name: 'Yuan Chinês', code: 'CNY', id: 7 },
    { name: 'Rand Sul-Africano', code: 'ZAR', id: 8 },
    { name: 'Dólar Australiano', code: 'AUD', id: 9 },
    { name: 'Dólar Canadense', code: 'CAD', id: 10 },
    { name: 'Peso Argentino', code: 'UYU', id: 11 },
    { name: 'Peso Chileno', code: 'CLP', id: 12 },
  ]

  return (
    <div>
      <label htmlFor={text}>{to}: </label>
      <select name={text} onChange={onChange} required>
        <option value="" disabled selected>
          Selecione
        </option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.code} disabled={disabled}>
            {coin.name}
          </option>
        ))}
      </select>
    </div>
  )
}
