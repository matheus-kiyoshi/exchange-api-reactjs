'use client'
import { useState } from 'react'
import CoinsList from './components/CoinsList/CoinsList'
import Modal from './components/Modal/Modal'

type dataType = {
  bid: number
  ask: number
  code: string
  high: number
  low: number
  name: string
  pctChange: number
}

export default function Home() {
  const [firstCoin, setFirstCoin] = useState('')
  const [secondCoin, setSecondCoin] = useState('')
  const [firstValue, setFirstValue] = useState('')
  const [conversion, setConversion] = useState(0)
  const [wasConverted, setWasConverted] = useState(false)
  const [modal, setModal] = useState(false)
  const [result, setResult] = useState<dataType>({
    bid: 0,
    ask: 0,
    code: '',
    high: 0,
    low: 0,
    name: '',
    pctChange: 0,
  })
  const url = 'https://economia.awesomeapi.com.br/json/'

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const request = await fetch(`${url}${firstCoin}-${secondCoin}`)
    const response = await request.json()
    const data: dataType = {
      bid: response[0]?.bid,
      ask: response[0]?.ask,
      code: response[0]?.code,
      high: response[0]?.high,
      low: response[0]?.low,
      name: response[0]?.name,
      pctChange: response[0]?.pctChange,
    }
    if (!isNaN(Number(data.bid))) {
      setConversion(Number(data.bid))
      setResult(data)
      setWasConverted(true)
    } else {
      setWasConverted(false)
      setModal(true)
    }
  }

  function handleClickModal() {
    setModal(false)
  }

  return (
    <div className="bg-white text-black w-screen h-screen">
      {modal && (
        <Modal
          title="ERRO"
          message="Ocorreu um erro na solicitação da API, a conversão desejada não existe ou não está disponível no momento."
          hasCloseButton={true}
          hasOkButton={true}
          handleClick={handleClickModal}
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h1>Conversor de Moedas</h1>
        <div>
          <label htmlFor="input">Quantia:</label>
          <input
            type="number"
            id="input"
            placeholder="Insira algum valor"
            onChange={(e) => setFirstValue(e.target.value)}
          />
          <CoinsList
            text="select"
            to="De"
            onChange={(e) => {
              setWasConverted(false)
              setFirstCoin(e.target.value)
            }}
            disabled={false}
            momentCoin={secondCoin}
          />
        </div>
        <div>
          <label htmlFor="input2">Conversão:</label>
          <input
            type="text"
            id="input2"
            readOnly
            placeholder="Converta alguma moeda..."
            value={
              firstValue !== '' && wasConverted
                ? (conversion * Number(firstValue)).toFixed(2).replace('.', ',')
                : ''
            }
          />
          <CoinsList
            text="select2"
            to="Para"
            onChange={(e) => {
              setWasConverted(false)
              setSecondCoin(e.target.value)
            }}
            disabled={false}
            momentCoin={firstCoin}
          />
        </div>
        <button type="submit">Converter</button>
      </form>
      <div>
        {wasConverted ? (
          <p>
            1 {firstCoin} é igual a <br />
            {Number(result.bid).toFixed(2).replace('.', ',')} {secondCoin}
          </p>
        ) : (
          <p>Converta alguma moeda...</p>
        )}
      </div>
    </div>
  )
}
