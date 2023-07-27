type CoinsListProps = {
  text: string
  to: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  disabled: boolean
  momentCoin: string | null
}
export default function CoinsList({
  text,
  to,
  onChange,
  disabled = false,
  momentCoin,
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
    { name: 'Peso Argentino', code: 'ARS', id: 11 },
    { name: 'Peso Chileno', code: 'CLP', id: 12 },
  ]

  function optionsGenerate() {
    return coins.map((coin) => {
      if (coin.code === momentCoin) {
        disabled = true
        return (
          <option key={coin.id} value={coin.code} disabled={disabled}>
            {coin.name}
          </option>
        )
      } else {
        disabled = false
        return (
          <option key={coin.id} value={coin.code} disabled={disabled}>
            {coin.name}
          </option>
        )
      }
    })
  }

  return (
    <div className="flex items-center justify-between">
      <label
        htmlFor={text}
        className="w-1/5 text-black mr-3 ml-1 font-semibold"
      >
        {to}:
      </label>
      <select
        name={text}
        onChange={onChange}
        required
        className="w-4/5 h-10 text-black rounded-sm pl-2 border border-gray-400 bg-slate-50"
      >
        <option value="" disabled selected>
          Selecione
        </option>
        {optionsGenerate()}
      </select>
    </div>
  )
}
