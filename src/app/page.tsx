'use client'
import { useState } from 'react'
import CoinsList from './components/Form/CoinsList/CoinsList'
import Modal from './components/Modal/Modal'
import './globals.css'
import Loading from './components/Loading/Loading'
import Result from './components/Result/Result'
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher'
import Input from './components/Form/Input/Input'
import Button from './components/Form/Button/Button'

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
  const [converting, setConverting] = useState(false)
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setConverting(true)
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
    setConverting(false)
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

  function resultGenerate() {
    if (converting) {
      return <Loading />
    } else {
      return wasConverted ? (
        <Result
          bid={result.bid}
          firstCoin={firstCoin}
          secondCoin={secondCoin}
        />
      ) : (
        <p className="text-black dark:text-zinc-200 font-semibold transition-all">
          Converta alguma moeda
          <span className="text-gray-800 dark:text-zinc-400 italic transition-all">
            ...
          </span>
        </p>
      )
    }
  }

  return (
    <div>
      {modal && (
        <Modal
          title="ERRO"
          message="Ocorreu um erro na solicitação da API, a conversão desejada não existe ou não está disponível no momento."
          hasCloseButton={true}
          hasOkButton={true}
          handleClick={handleClickModal}
        />
      )}
      <div className="bg text-black w-screen h-screen flex justify-center items-center transition-all">
        <main className="flex flex-col items-center rounded-3xl gap-10 p-12 bg bs transition-all">
          <ThemeSwitcher />
          <h1 className="text-3xl font-extrabold underline dark:text-purple-700 transition-all">
            Conversor de Moedas
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col-reverse gap-3 w-64 h-28">
              <Input
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
            <div className="flex flex-col-reverse gap-3 w-64 h-28 mt-2">
              <Input
                type="text"
                id="input2"
                placeholder="Converta alguma moeda..."
                readOnly
                value={
                  firstValue !== '' && wasConverted
                    ? `${secondCoin} ${(conversion * Number(firstValue))
                        .toFixed(2)
                        .replace('.', ',')}`
                    : `${secondCoin}`
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
            <Button
              style="w-full h-9 rounded-md bg-blue-500 text-white font-bold mt-3 hover:text-blue-500 hover:border hover:border-blue-500 hover:bg-white dark:hover:bg-zinc-800 transition-all ease-in-out duration-300"
              text="Converter"
            />
          </form>
          <div className="border border-gray-400 dark:border-gray-600 rounded-2xl p-4 transition-all">
            {resultGenerate()}
          </div>
        </main>
      </div>
    </div>
  )
}
