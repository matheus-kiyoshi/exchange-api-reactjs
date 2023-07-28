type ResultProps = {
  bid: number
  firstCoin: string
  secondCoin: string
}

export default function Result({ bid, firstCoin, secondCoin }: ResultProps) {
  const values = [1, 10, 100, 1000]

  return (
    <p className="text-black dark:text-zinc-200 text-justify transition-all">
      {values.map((value) => (
        <span key={value}>
          <span className="text-blue-600 font-semibold">{value}</span>{' '}
          <b>{firstCoin}</b> é igual a{' '}
          <span className="text-blue-600 font-semibold">
            {(Number(bid) * value).toFixed(2).replace('.', ',')}
          </span>{' '}
          <b>{secondCoin}</b> <br />
        </span>
      ))}
    </p>
  )
}
