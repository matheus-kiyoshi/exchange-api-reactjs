import { twMerge } from 'tailwind-merge'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'

type ModalProps = {
  title: string
  message: string
  hasCloseButton?: boolean
  hasOkButton?: boolean
  handleClick: () => void
}

export default function Modal({
  title,
  message,
  hasCloseButton,
  hasOkButton,
  handleClick,
}: ModalProps) {
  return (
    <div>
      <div className="absolute w-screen h-screen bg-black bg-opacity-30"></div>
      <div className="absolute w-screen h-screen flex items-center justify-center">
        <div className="absolute w-96 h-72 bg-white rounded-xl flex flex-col justify-between items-center">
          <div className="flex justify-between items-center bg-red-500 text-white w-96 h-12 rounded-t-xl">
            <p className="ml-4">{title}</p>
            {hasCloseButton && (
              <button className="mr-6" onClick={handleClick}>
                <AiOutlineClose />
              </button>
            )}
          </div>
          <div
            className={twMerge(
              'flex justify-evenly items-center gap-3 w-full',
              !hasOkButton && 'mb-24',
            )}
          >
            <BiSolidErrorCircle className="h-24 w-1/3 text-red-500" />
            <p className="text-sm w-2/3 h-24 mr-4 text-justify flex items-center">
              {message}
            </p>
          </div>
          {hasOkButton && (
            <button
              className="bg-green-500 text-white w-28 h-12 rounded-2xl mb-5"
              onClick={handleClick}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
